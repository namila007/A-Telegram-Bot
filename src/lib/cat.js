const axios = require('axios').default
const catAPI = require('../../config/config').catAPI

async function getCatPic (url) {
  return axios
    .get(url)
    .then((res) => res.data)
    .then((res) => res[0].url)
}

module.exports = (bot) => {
  bot.onText(/\/cat/, async (msg) => {
    const chatId = msg.chat.id
    const url = await getCatPic(catAPI)
    console.info(`Sending a cat pic to ChatID: ${chatId}, ReplyMsgId: ${msg.message_id}`)
    bot.sendPhoto(chatId, url, { reply_to_message_id: msg.message_id })
  })
}
