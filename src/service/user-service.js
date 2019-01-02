var _mm = require('utils/mm.js')

var _user = {
  // 登出
  logout: function (resolve, reject) {
    _mm.request({
       url: _mm.geServerUrl('/user/logout.do'),
       method: 'POST',
       success: resolve,
       error: reject
    })
  },
  // 检查登录
  checkLogin: function (resolve, reject) {
    _mm.request({
       url: _mm.geServerUrl('/user/get_user_info.do'),
       method: 'POST',
       success: resolve,
       error: reject
    })
  },
  // 登录
  login: function (userInfo, resolve, reject) {
    _mm.request({
       url: _mm.geServerUrl('/user/login.do'),
       method: 'POST',
       data: userInfo,
       success: resolve,
       error: reject
    })
  },
  // 检查用户名是否存在
  checkUserName: function (username, resolve, reject) {
    _mm.request({
       url: _mm.geServerUrl('/user/check_valid.do'),
       method: 'POST',
       data: {
         type: 'username',
         str: username
       },
       success: resolve,
       error: reject
    })
  },
  // 检查注册
  userRegister: function (userInfo, resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/user/register.do'),
      method: 'POST',
      data: userInfo,
      success: resolve,
      error: reject
    })
  },
  // 找回密码第一步
  getQuestion: function (username, resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/user/forget_get_question.do'),
      method: 'POST',
      data: {
        username: username
      },
      success: resolve,
      error: reject
    })
  },
  // 找回密码第二步
  checkAnswer: function (userInfo, resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/user/forget_check_answer.do'),
      method: 'POST',
      data: userInfo,
      success: resolve,
      error: reject
    })
  },
  // 提交密码
  resetPaaword: function (userInfo, resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/user/forget_reset_password.do'),
      method: 'POST',
      data: userInfo,
      success: resolve,
      error: reject
    })
  },
  // 个人中心获取用户信息
  getUserInfo: function (resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/user/get_information.do'),
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  updateUserInfo: function (userInfo, resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/user/update_information.do'),
      method: 'POST',
      data: userInfo,
      success: resolve,
      error: reject
    })
  }
}

module.exports = _user