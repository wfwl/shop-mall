require('./login.css')
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
    $('#submit').click(function () {
      _this.submit()
    })
    $('.user-content').keyup(function (e) {
      if (e.keyCode === 13) {
        _this.submit()
      }
    })
  },
  // 登录按钮
  submit: function () {
    var formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val())
    }
    var valdateResult = this.formvalData(formData)
    if (valdateResult.status) {
      _user.login(formData, function (res) {
        window.location.href = _mm.getUrlParam('redirect') || './index.html'
      }, function (errMsg) {
        formError.show(errMsg)
      })
    } else {
      formError.show(valdateResult.msg)
      console.log(valdateResult.msg)
    }
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