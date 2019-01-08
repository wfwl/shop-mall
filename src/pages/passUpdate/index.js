require('./index.css')
import _mm from 'utils/mm.js'
import 'pages/common/nav/index.js'
import navSide from 'pages/common/nav-side/index.js'
import 'pages/common/header/index.js'
import _user  from 'service/user-service.js'


var page = {
  init: function () {
    this.onLoad()
    this.bindEvent()
  },
  onLoad: function () {
    navSide.init({
      name: 'pass-update'
    })
  },
  bindEvent: function () {
    var _this = this
    $(document).on('click', '.btn-submit', function () {
      var userPassword = {
        password: $.trim($('#password').val()),
        passwordNew: $.trim($('#password-new').val()),
        passwordComfirm: $.trim($('#password-comfirm').val())
      }
      var valdateResult = _this.formvalData(userPassword)
      if (valdateResult.status) {
        _user.updatePassword({
          passwordOld: userPassword.password,
          passwordNew: userPassword.passwordNew
        }, function(res, msg) {
          _mm.successTips(msg)
        }, function(errMsg) {
          _mm.errorTips(errMsg)
        })
      } else {
        _mm.errorTips(valdateResult.msg)
      }
    })
  },
  // 校验表单
  formvalData: function (formData) {
    var result = {
      status: false,
      msg: ''
    }
    if (!_mm.vaildata(formData.password, 'require')) {
      result.msg = '原密码不能为空'
      return result
    }
    if (!_mm.vaildata(formData.passwordNew, 'require')) {
      result.msg = '新密码不能为空'
      return result
    }
    if (!formData.passwordNew || formData.passwordNew.length < 6) {
      result.msg = '新密码长度不能小于6位'
      return result
    }
    if (formData.passwordNew !== formData.passwordComfirm) {
      result.msg = '两次密码不一致'
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