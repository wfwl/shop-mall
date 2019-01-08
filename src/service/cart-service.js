var _mm = require('utils/mm.js')

var _cart = {
  // 获取购物车数量
  getCartCount: function (resolve, reject) {
    _mm.request({
       url: _mm.geServerUrl('/cart/get_cart_product_count.do'),
       success: resolve,
       error: reject
    })
  },
  // 加入购物车
  addToCart: function (productInfo, resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/cart/add.do'),
      data: productInfo,
      success: resolve,
      error: reject
   })
  },
  // 获取购物车
  getCartList: function (resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/cart/list.do'),
      success: resolve,
      error: reject
   })
  },
  // 单选
  selectProduct: function (productId, resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/cart/select.do'),
      data: {
        productId: productId
      },
      success: resolve,
      error: reject
   })
  },
  // 取消单选
  unselectProduct: function (productId, resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/cart/un_select.do'),
      data: {
        productId: productId
      },
      success: resolve,
      error: reject
   })
  },
  // 全选
  selectAllProduct: function (resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/cart/select_all.do'),
      success: resolve,
      error: reject
   })
  },
  // 取消全选
  unselectAllProduct: function (resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/cart/un_select_all.do'),
      success: resolve,
      error: reject
   })
  },
  // 修改商品数量
  updateProduct: function (productInfo, resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/cart/update.do'),
      data: productInfo,
      success: resolve,
      error: reject
   })
  },
  // 删除商品
  deleteProduct: function (productIds, resolve, reject) {
    _mm.request({
      url: _mm.geServerUrl('/cart/delete_product.do'),
      data: {
        productIds: productIds
      },
      success: resolve,
      error: reject
   })
  }
}

module.exports = _cart