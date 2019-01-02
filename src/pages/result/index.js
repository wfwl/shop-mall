require('./index.css')
var _mm = require('utils/mm.js')
require('pages/common/nav-simple/index.js')

$(function () {
  var type = _mm.getUrlParam('type') || '', $element = $('.' + type + '-success')
  $element.show()
})