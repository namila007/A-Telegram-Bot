const FilterListClass = require('../data/FilterList')
const _ = require('lodash')
const config = require('../../config/config')

const filterList = new FilterListClass()
const filterArr = filterList.get()
module.exports = (bot) => {
  // Matches "/mkfilter [filterword] [response]"
  bot.onText(/\/mkfilter (.+)/, (msg, match) => {
    const chatId = msg.chat.id
    const value = match[1].split(' ')
    const filterword = value[0].toLowerCase()
    let response = ''
    for (let i = 1; i < value.length; i++) {
      response = response + value[i] + ' '
    }
    console.info(`New Filter recieved. ChatID: ${chatId}, Filter: ${filterword}, Response: ${response}`)
    filterList.add(chatId, filterword, response)
  })

  // remove a filter
  bot.onText(/\/rmfilter (.+)/, (msg, match) => {
    const chatId = msg.chat.id
    const value = match[1].split(' ')
    const filterword = value[0].toLowerCase()
    console.info(`Removing filter, ChatID: ${chatId}, Filter: ${filterword}`)
    _.remove(
      filterArr,
      (n) => n.chatId === chatId && n.filter === filterword
    )
  })

  // show filterlist for the current chat
  bot.onText(/\/shfilters/, (msg) => {
    let filters = ''
    let msgList = ''
    if (config.isDev) {
      console.log('shfilters ', msg.text)
      console.log(filterArr)
    }
    const chatId = msg.chat.id

    filterList
      .get()
      .filter((x) => x.chatId === chatId)
      .forEach((x) => (filters += '- ' + x.filter + '\n'))
    if (config.isDev) console.log(filters)

    if (filters.length === 0) msgList = 'No filters found'
    else msgList = 'Available filters:\n' + filters
    bot.sendMessage(chatId, msgList, { reply_to_message_id: msg.message_id })
  })

  // remove all filters in group chat. only admins can perform it.
  bot.onText(/\/rmfilters/, async (msg) => {
    const chatId = msg.chat.id
    // personal chat
    if (msg.chat.type === 'private') _.remove(filterArr, (n) => n.chatId === chatId)
    // group chat
    else {
      const admins = await bot.getChatAdministrators(chatId)
      const userId = msg.from.id
      if (admins.filter(x => x.user.id === userId).length === 1) {
        console.info(`Removing all filters for chatId: ${chatId}`)
        _.remove(filterArr, (n) => n.chatId === chatId)
        bot.sendMessage(chatId, 'Deleted all filters', { reply_to_message_id: msg.message_id })
      } else {
        console.info(`Removing all filters for chatId: ${chatId} Denied. Not an Admin`)
        bot.sendMessage(chatId, 'Only Group admins can delete all the filters', { reply_to_message_id: msg.message_id })
      }
    }
  })

  // Listen for any kind of message. There are different kinds of
  // messages.
  bot.on('message', (msg) => {
    if (config.isDev) {
      console.log(msg)
    }
    const chatId = msg.chat.id
    const arr = filterArr.filter((o) => {
      return (
        o.chatId === chatId && o.filter.toString() === msg.text.toLowerCase()
      )
    })
    if (arr.length > 0) {
      console.info(`Filter found. ChatID: ${chatId}, ReplyMsgId: ${msg.message_id}`)
      bot.sendMessage(chatId, arr[0].response, { reply_to_message_id: msg.message_id })
    }
  })
}
