const express = require('express')
const config = require('../config/config')
const server = express()

const TOKEN = config.botToken
const PORT = config.port
const URL = config.url

module.exports = (bot) => {
  server.use(express.json())

  // This informs the Telegram servers of the new webhook.
  bot.setWebHook(`${URL}/bot${TOKEN}`)

  // geting updates from telegram app
  server.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body)
    res.sendStatus(200)
  })

  // listing port
  server.listen(PORT, () => {
    console.log(`Express server is listening on ${PORT}`)
  })
}
