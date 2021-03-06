const util = require('../utils/util.js')
const cache = require('../utils/cacheUtil.js')
const api = require('../config/api.js')


/**
 * ログイン処理
 */
const loginByWeixin = () => {
  let code = null;
  return new Promise((resolve, reject) => {
    return util.login().then((res) => {
      code = res.code
      return util.getUserInfo()
    }).then((data) => {
      // アプリ特有のアクセストークンを渡したいならここで、api requestする
      // ここでは一旦 `code` を渡すようにする
      cache.set('userInfo', data.userInfo)
      cache.set('token', code)
      resolve(data)
    }).catch((err) => {
      reject(err)
    })
  })
}

/**
 * セッションの確認
 */
const checkLogin = () => {
  return new Promise((resolve, reject) => {
    if (cache.get('userInfo') && cache.get('token')) {
      util.checkSession().then(() => {
        console.log('[session] check success')
        console.log(cache.get('userInfo'))
        resolve(true)
      }).catch(() => {
        reject(false)
      })
    } else {
      loginByWeixin().then((res) => {
        console.log('[session] new session created')
        resolve(true)
      }).catch((err) => {
        console.log(err)
        resolve(false)
      })
    }
  })
}


module.exports = {
  loginByWeixin,
  checkLogin,
}
