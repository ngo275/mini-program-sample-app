const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 外部APIへrequest
 */
const request = (url, data = {}, method = "GET") => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        if (res.statusCode == 200) {
          resolve(res.data)
        } else {
          reject(res.errMsg)
        }
      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  })
}

/**
 * WeChatアカウントでログイン
 */
const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res)
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

/**
 * WeChat APIでUser情報を取得
 */
const getUserInfo = () => {
  return new Promise((resolve, reject) => {

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              console.log(res)
              resolve(res)
            }, fail: err => {
              reject(err)
            }
          })
        }
      }
    })
  })
}


/**
 * ユーザのセッションを確認
 */
const checkSession = () => {
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: function () {
        resolve(true)
      },
      fail: function () {
        reject(false)
      }
    })
  })
}

module.exports = {
  formatTime,
  request,
  login,
  getUserInfo,
  checkSession,
}