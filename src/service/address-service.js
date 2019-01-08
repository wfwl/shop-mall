var _mm = require('utils/mm.js')

var _address = {
  // 获取地址列表
  getAddressList: function (resolve, reject) {
    _mm.request({
       url: _mm.geServerUrl('/shipping/list.do'),
       data: {
          pageSize: 50
       },
       success: resolve,
       error: reject
    })
  },
  // 新建地址
  save: function (addressInfo, resolve, reject) {
    _mm.request({
       url: _mm.geServerUrl('/shipping/add.do'),
       data: addressInfo,
       success: resolve,
       error: reject
    })
  },
  // 获取收件人信息
  getAddress: function (shippingId, resolve, reject) {
    _mm.request({
       url: _mm.geServerUrl('/shipping/select.do'),
       data: {
        shippingId: shippingId
       },
       success: resolve,
       error: reject
    })
  },
  // 更新地址
  update: function (addressInfo, resolve, reject) {
    _mm.request({
       url: _mm.geServerUrl('/shipping/update.do'),
       data: addressInfo,
       success: resolve,
       error: reject
    })
  }
}

module.exports = _address