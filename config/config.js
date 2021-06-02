require('dotenv').config()

module.exports = {
  botToken: process.env.BOT_TOKEN,
  isDev: process.env.IS_DEV || false,
  catAPI: 'https://api.thecatapi.com/v1/images/search'
}
