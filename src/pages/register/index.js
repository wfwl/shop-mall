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
  init: function () {
    this.bindEvent()
  },
  bindEvent: function () {
    var _this = this
    // 验证用户名是否存在
    $('#username').blur(function () {
      var username = $.trim($(this).val())
      // 用户名为空不验证
      if (!username) return
      _user.checkUserName(username, function(res) {
        formError.hide()
      }, function(errMsg){
        formError.show(errMsg)
      })
    })
    // 提交表单
    $('#submit').click(function(){
      _this.submit()
    })
    $('.user-content').keyup(function(e){
      if (e.keyCode === 13) {
        _this.submit()
      }
    })
  },
  // 注册按钮
  submit: function () {
    var formData  = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val()),
      passwordConfirm: $.trim($('#password-confirm').val()),
      phone: $.trim($('#phone').val()),
      email: $.trim($('#email').val()),
      question: $.trim($('#question').val()),
      answer: $.trim($('#answer').val())
    }
    var valdateResult = this.formvalData(formData)
    if (valdateResult.status) {
      _user.userRegister(formData, function(res) {
        window.location.href = './result.html?type=register'
      }, function(errMsg) {
        formError.show(errMsg)
      })
    } else {
      formError.show(valdateResult.msg)
    }
  },
  // 校验表单
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
    if (formData.password.length < 6) {
      result.msg = '密码长度不能小于6位'
      return result
    }
    // 两次输入密码是否一致
    if (formData.password !== formData.passwordConfirm) {
      result.msg = '两次输入的密码不一致'
      return result
    }
    if (!_mm.vaildata(formData.phone, 'phone')) {
      result.msg = '请输入正确的手机号'
      return result
    }
    if (!_mm.vaildata(formData.email, 'email')) {
      result.msg = '请输入正确的邮箱'
      return result
    }
    if (formData.question === '') {
      result.msg = '密码提示问题不能为空'
      return result
    }
    if (formData.answer === '') {
      result.msg = '密码提示问题答案不能为空'
      return result
    }
    result.status = true
    result.msg = '验证通过'
    return result
  }
}
$(function(){
  page.init()
})