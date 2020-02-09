// components/classic/music/index.js
import {
  classicBehavior
} from '../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],
  properties: {
    src: String,
    title: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    waittingUrl: 'images/player@waitting.png',
    playingUrl: 'images/player@playing.png'
  },

  lifetimes:{
    attached:function(){
      this._recoverStatus()
      this._monitorSwitch()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function () {
      const {
        src,
        title,
        playing,
      } = this.data

      if (!playing) {
        this.setData({
          playing: true,
        })
        mMgr.src = src
        mMgr.title = title
      } else {
        this.setData({
          playing: false,
        })
        mMgr.pause()
      }


    },

    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false,
        })
        return
      }

      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      }),
      mMgr.onEnded(()=>{
        this._recoverStatus()
      })
    },

  }
})