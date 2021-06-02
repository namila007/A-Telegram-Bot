const config = require('../config/config')
const TelegramBot = require('node-telegram-bot-api')
const server = require('./server')
const filter = require('./lib/filter')
const catPic = require('./lib/cat')
const token = config.botToken

console.info('Bot token loaded: ', token)
if (!token) {
  console.error('NO TELEGRAM APP TOKEN IS FOUNDED')
  process.exit(1)
}
const bot = new TelegramBot(token, { polling: true })
// starting server to listen
server(bot)
console.info('App started')

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}!`)
})

filter(bot)
catPic(bot)
