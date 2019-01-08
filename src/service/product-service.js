var _mm = require('utils/mm.js')

var _product = {
  // 获取商品列表
  getProductList: function (listParam, resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/product/list.do'),
      data: listParam,
      success: resolve,
      error: reject
    })
  },
  // 获取商品详情
  getProdunctDetail: function (productId, resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/product/detail.do'),
      data: {
        productId: productId
      },
      success: resolve,
      error: reject
    })
  }
}

module.exports = _product