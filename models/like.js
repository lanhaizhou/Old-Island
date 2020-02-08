import {
  HTTP
} from '../utils/http'

class LikeModel extends HTTP {
  like(behavior, artId, category) {
    let url = behavior == 'like' ? 'like' : 'like/cancel'
    this.request({
      url,
      data: {
        art_id: artId,
        type: category,
      },
      method: 'POST',
    })
  }
}

export {
  LikeModel
}