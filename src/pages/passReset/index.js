require('./index.css')
var _mm = require('utils/mm.js')
var _user = require('service/user-service.js')
require('pages/common/nav-simple/index.js')
// 表单错误提示
var formError = {
  show: function (errorMsg) {
    $('.error-item').show().find('.error-msg').text(errorMsg)
  },
  hide: function () {
    $('.error-item').hide().find('.error-msg').text('')
  }
}

var page = {
  data: {
    username: '',
    question: '',
    answer: '',
    token: ''
  },
  init: function () {
    this.bindEvent()
    this.onLoad()
  },
  onLoad: function () {
    this.loadStepUserName()
  },
  loadStepUserName: function () {
    $('.step-username').show()
  },
  // 第一步
  loadStepQuestion: function () {
    formError.hide()
    $('.step-username').hide().siblings('.step-question')
      .show().find('.question').text(this.data.question)
  },
  // 第二步
  loadStepPassword: function () {
    formError.hide()
    $('.step-question').hide().siblings('.step-new-password').show()
  },
  bindEvent: function () {
    var _this = this
    // 找回密码第一步
    $('#submit-username').click(function () {
      var username = $.trim($('#username').val())
      if (username) {
        _user.getQuestion(username, function (res) {
          _this.data.username = username
          _this.data.question = res
          _this.loadStepQuestion()
        }, function (errMsg) {
          formError.show(errMsg)
        })
      } else {
        formError.show('请输入答案')
      }
    })
    // 找回密码第二步
    $('#submit-answer').click(function () {
      var answer = $.trim($('#answer').val())
      if (answer) {
        _user.checkAnswer({
          username: _this.data.username,
          question: _this.data.question,
          answer: answer
        }, function (res) {
          _this.data.answer = answer
          _this.data.token = res
          _this.loadStepPassword()
        }, function (errMsg) {
          formError.show(errMsg)
        })
      } else {
        formError.show('请输入用户名')
      }
    })
    // 提交新密码
    $('#submit-password').click(function () {
      var password = $.trim($('#password').val())
      if (password && password.length >= 6) {
        _user.resetPaaword({
          username: _this.data.username,
          forgetToken: _this.data.token,
          passwordNew: password
        }, function (res) {
          window.location.href = './result.html?type=resetpassword'
        }, function (errMsg) {
          formError.show(errMsg)
        })
      } else {
        formError.show('请输入不少于6位新密码')
      }
    })
  },
  // 验证表单是否为空
  formvalData: function (formData) {
    var result = {
      status: false,
      msg: ''
    }
    if (!_mm.vaildata(formData.username, 'require')) {
      result.msg = '用户名不能为空'
      return result
    }
    if (!_mm.vaildata(formData.password, 'require')) {
      result.msg = '密码不能为空'
      return result
    }
    result.status = true
    result.msg = '验证通过'
    return result
  }
}
$(function () {
  page.init()
})