import {
  config
} from '../config'

class HTTP {

  request({
    url,
    data = {},
    method = 'GET'
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: `${config.baseRestUrl}${url}`,
      data,
      method,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: res => {
        const code = res.statusCode.toString()
        const startChar = code.charAt(0)
        if (startChar == '2') {
          resolve(res.data)
        } else {
          reject()
        }
      },
      fail: err => {
        reject()
      }
    });
  }
}

export {
  HTTP
}