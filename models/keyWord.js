import {
  HTTP
} from '../utils/http-p'

class KeywordModel extends HTTP {
  constructor() {
    super()
    this.key = 'q'
    this.maxLength = 10
  }

  getHistory() {
    return wx.getStorageSync(this.key) ? wx.getStorageSync(this.key) : []
  }

  getHot() {
    return this.request({
      url: 'book/hot_keyword'
    })
  }

  addToHistory(keyWord) {
    const words = this.getHistory()
    const has = words.includes(keyWord)
    if (!has) {
      if (words.length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyWord)
      wx.setStorageSync(this.key, words)
    }

  }

}

export {
  KeywordModel
}