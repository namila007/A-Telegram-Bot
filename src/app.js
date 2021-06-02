const config = require('../config/config')
const TelegramBot = require('node-telegram-bot-api')
const filter = require('./lib/filter')
const catPic = require('./lib/cat')
const token = config.botToken
const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}!`)
})

filter(bot)
catPic(bot)
