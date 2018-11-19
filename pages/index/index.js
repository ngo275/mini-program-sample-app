//index.js
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
        pages: ['test1', 'test2', 'test3', 'test4', 'test5'],
      },
      {
        id: 'youku',
        name: '优酷',
        open: false,
        pages: ['test1', 'test2', 'test3', 'test4'],
      },
    ],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function() {
    console.log('page onShow')
  },
  onLoad: function () {
    console.log('page onLoad')
    console.log(app.globalData.userInfo)
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
})
