//app.js
const user = require('./services/user.js')

App({
  onLaunch: function () {
    user.checkLogin().then(res => {
      this.globalData.userInfo = wx.getStorageSync('userInfo')
      this.globalData.token = wx.getStorageSync('token')
      console.log('[session] verified')
    }).catch(() => {
      console.log('[session] error')
    });
  },

  globalData: {
    userInfo: {
      nickName: 'Hi,游客',
      avatarUrl: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png'
    },
    token: '',
  }
})