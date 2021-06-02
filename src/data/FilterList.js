class FilterList {
  constructor () {
    const instance = this.constructor.instance
    if (instance) {
      return instance
    }
    this.filterArray = []
    this.constructor.instance = this
  }

  add (chatId, filterWord, response) {
    const obj = {
      chatId: chatId,
      filter: filterWord.toString().toLowerCase(),
      response: response
    }
    this.filterArray.push(obj)
  }

  get () {
    return this.filterArray
  }

  set (arr) {
    this.filterArray = arr
  }
}

module.exports = FilterList
