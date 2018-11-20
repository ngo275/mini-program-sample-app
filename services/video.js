const util = require('../utils/util.js')
const api = require('../config/api.js')


const load = () => {
  return new Promise((resolve, reject) => {
    return util.request(api.Videos).then(res => {
      console.log(res)
      return res
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  })
}

module.exports = {
  load,
}