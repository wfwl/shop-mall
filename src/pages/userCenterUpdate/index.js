require('./index.css')
import _mm from 'utils/mm.js'
import 'pages/common/nav/index.js'
import navSide from 'pages/common/nav-side/index.js'
import 'pages/common/header/index.js'
import _user  from 'service/user-service.js'
import templateIndex from './index.string'


var page = {
  init: function () {
    this.onLoad()
    this.bindEvent()
  },
  onLoad: function () {
    navSide.init({
      name: 'user-center'
    })
    this.loadUserInfo()
  },
  bindEvent: function () {
    var _this = this
    $(document).on('click', '.btn-submit', function () {
      var userInfo = {
        username:  $.trim($('#username').val()),
        phone:  $.trim($('#phone').val()),
        email:  $.trim($('#email').val()),
        question:  $.trim($('#question').val()),
        answer:  $.trim($('#answer').val())
      }
      var vailDataResult = _this.valiDataFrom(userInfo)
      if (vailDataResult.status) {
        _user.updateUserInfo(userInfo, function(res, msg){
          _mm.successTips(msg)
          window.location.href = './userCenter.html'
        }, function(errorMsg){
          _mm.errorTips(errorMsg)
        })
      } else {
        _mm.errorTips(vailDataResult.msg)
      }
    })
  },
  // 校验表单
  valiDataFrom: function (formData) {
    var result = {
      status: false,
      msg: ''
    }
    if (!_mm.vaildata(formData.username, 'require')) {
      result.msg = '用户名不能为空'
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
  },
  loadUserInfo: function () {
    var userHtml = ''
    _user.getUserInfo(function(res){
      userHtml = _mm.renderHtml(templateIndex, res)
      $('.panel-body').html(userHtml)
    }, function(errorMsg){
      _mm.errorTips(errorMsg)
    })
  }
}
$(function () {
  page.init()
})