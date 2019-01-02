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
  },
  onLoad: function () {
    navSide.init({
      name: 'user-center'
    })
    this.loadUserInfo()
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