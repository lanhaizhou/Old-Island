import {
  HTTP
} from '../utils/http-p'

class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }


}

export {
  BookModel
}