require('./index.css')
var _mm = require('utils/mm.js')
require('pages/common/nav-simple/index.js')

$(function () {
  var type = _mm.getUrlParam('type') || '', $element = $('.' + type + '-success')
  if (type === 'payment') {
    var $orderNumber = $element.find('.order-number'), orderNumber = _mm.getUrlParam('orderNumber')
    $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber)
  }
  $element.show()
})