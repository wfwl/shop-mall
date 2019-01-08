var _mm = require('utils/mm.js')

var _order = {
  // 获取订单列表
  getProductList: function (resolve, reject) {
    _mm.request({
       url: _mm.geServerUrl('/order/get_order_cart_product.do'),
       success: resolve,
       error: reject
    })
  },
  // 提交订单
  createOrder: function (orderInfo, resolve, reject) {
    _mm.request({
       url: _mm.geServerUrl('/order/create.do'),
       success: resolve,
       data: orderInfo,
       error: reject
    })
  }
}

module.exports = _order