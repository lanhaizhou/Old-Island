// pages/detail/detail.js
import {
  BookModel
} from '../../models/book'
import {
  LikeModel
} from '../../models/like'
const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    likeStatus: false,
    likeCount: 0,
    noComment: true,
    posting: false,
  },

  onLike: function (event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  onFakePost: function () {
    this.setData({
      posting: true
    })
  },

  onCancel: function () {
    this.setData({
      posting: false
    })
  },

  onPost: function (event) {
    const comment = event.detail.text || event.detail.value
    if (!comment) return
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '短评增加成功',
        icon: 'none'
      })

      this.data.comments.unshift({
        content: comment,
        nums: 1,
      })
      this.setData({
        comments: this.data.comments,
        posting: false,
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      bid
    } = options

    // 方法1
    // bookModel.getDetail(bid).then(res => {
    //   this.setData({
    //     book: res
    //   })
    // })
    // bookModel.getComments(bid).then(res => {
    //   this.setData({
    //     noComment: res.comments == false ? true : false,
    //     comments: res.comments
    //   })
    // })
    // bookModel.getLikeStatus(bid).then(res => {
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums,
    //   })
    // })

    // 方法2
    wx.showLoading({})
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    // Promise.race() 竞争，.then返回的是最先请求完成的结果
    Promise.all([detail, comments, likeStatus]).then(res => {
      this.setData({
        book: res[0],
        noComment: res[1].comments == false ? true : false,
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums,
      })
      wx.hideLoading()
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})