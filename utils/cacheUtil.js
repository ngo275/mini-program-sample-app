module.exports = {
  set: (key, value) => {
    wx.setStorageSync(key, value)
  },
  get: (key) => {
    const v = wx.getStorageSync(key)
    return v
  }
}
