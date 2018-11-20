//index.js
const videos = require('../../services/video.js')
const util = require('../../utils/util.js')
const api = require('../../config/api.js')

const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [
      {
        id: 'tencent_videos',
        name: '腾讯视频',
        open: false,
        videos: [],
      },
    ],
  },
  bindViewTap: function() {
    wx.navigateTo({
      // TODO: fix to user profile
      url: '../logs/logs'
    })
  },
  onShow: function() {
    console.log('page onShow')
  },
  onLoad: function () {
    console.log('page onLoad')
    console.log(app.globalData.userInfo)
    this.loadData()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
  },
  toggleDetail: function(e) {
    var id = e.currentTarget.id, list = this.data.list
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    })
  },
  loadData: function() {
    util.request(api.Videos).then(res => {
      this.setData({
        list: res.videos,
      })
    }).catch(err => {
      console.log(err)
    })
  }
})
