import {
  HTTP
} from '../utils/http'

class ClassicModel extends HTTP {
  getLatest(sCallBack) {
    this.request({
      url: 'classic/latest',
      success: res => {
        sCallBack(res)
        this._setLatestIndex(res.index)
        wx.setStorageSync(this._getKey(res.index), res)
      }
    })
  }

  getClassic(index, nextOrPrevious, sCallBack) {
    const key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    const classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallBack(res)
        }
      })
    } else {
      sCallBack(classic)
    }

  }

  getMyFavor(success){
    const params = {
      url:'classic/favor',
      success:success
    }
    this.request(params)
  }

  isFirst(index) {
    return index == 1 ? true : false
  }

  isLatest(index) {
    const latestIndex = this._getLatestIndex()
    return index == latestIndex ? true : false
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    const index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    return `classic-${index}`
  }




}

export {
  ClassicModel
}