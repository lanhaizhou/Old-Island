// pages/classic/classic.js
import {
  ClassicModel
} from '../../models/classic'
import {
  LikeModel
} from '../../models/like'
const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: {},
    first: false,
    latest: true,
    likeStatus: false,
    likeCount: 0,
  },

  onLike: function (event) {
    let behavior = event.detail.behavior
    const {
      id,
      type
    } = this.data.classic
    likeModel.like(behavior, id, type)

  },

  _updateClassic: function (nextOrPrevious) {
    const {
      classic
    } = this.data
    classicModel.getClassic(classic.index, nextOrPrevious, res => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLatest(res.index),
      })
    })
  },

  _getLikeStatus: function (artId, category) {
    likeModel.getClassicLikeStatus(artId, category, res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  onNext: function (even) {
    this._updateClassic('next')
  },

  onPrevious: function (even) {
    this._updateClassic('previous')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest(res => {
      this.setData({
        classic: res,
        likeStatus: res.like_status,
        likeCount: res.fav_nums,
      })
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