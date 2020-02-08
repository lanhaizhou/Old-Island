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
      }
    })
  }

  getPrevious(index, sCallBack) {
    this.request({
      url: `classic/${index}/previous`,
      success: res => {
        sCallBack(res)
      }
    })
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




}

export {
  ClassicModel
}