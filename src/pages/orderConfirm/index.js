import './index.css'
import _mm from 'utils/mm.js'
import 'pages/common/header/index.js'
import nav from 'pages/common/nav/index.js'
import _order from 'service/order-service.js'
import _address from 'service/address-service.js'
import _addressModal from './addressModal.js'
import templateProduct from './productList.string'
import templateAddress from './addressList.string'

var page = {
  data: {
    selectedAddressId: null
  },
  init: function() {
    this.onLoad()
    this.bindEvent()
  },
  onLoad: function() {
    this.loadAddressList()
    this.loadProductList()
  },
  bindEvent: function() {
    // 地址的选择
    var _this = this
    $(document).on('click', '.address-item', function() {
      $(this).addClass('active').siblings('.address-item').removeClass('active')
      _this.data.selectedAddressId = $(this).data('id')
    })
    // 订单提交
    $(document).on('click', '.order-submit', function() {
      var shippingId = _this.data.selectedAddressId
      if (shippingId) {
        _prder.createOrder({
          shippingId: shippingId
        },function(res) {
          window.location.href= './payment.html?orderNumber=' + res.orderNo
        },function(errMsg) {

        })
      } else {
        _mm.errorTips('请选择地址')
      }
    })
    // 地址的添加
    $(document).on('click', '.address-add', function() {
      _addressModal.show({
        isUpdate: false,
        onSuccess: function() {
          _this.loadAddressList()
        }
      })
    })
    // 编辑地址
    $(document).on('click', '.address-update', function(){
      var shippingId = $(this).parents('.address-item').data('id')
      _address.getAddress(shippingId, function(res){
        _addressModal.show({
          isUpdate: true,
          data: res,
          onSuccess: function() {
            _this.loadAddressList()
          }
        })
      }, function(errMsg){
        _mm.errorTips(errMsg)
      })
    })
  },
  // 获取地址列表
  loadAddressList: function(){
    var _this = this
    _address.getAddressList(function(res){
      var addressHtml = _mm.renderHtml(templateAddress, res)
      $('.address-con').html(addressHtml)
    },function(errMsg){
      $('.address-con').html('<p class="err-tip">地址加载失败，刷新下试试吧。</p>')
    })
  },
  // 获取商品列表
  loadProductList: function(){
    var _this = this
    _order.getProductList(function(res){
      var productHtml = _mm.renderHtml(templateProduct, res)
      $('.product-con').html(productHtml)
    },function(errMsg){
      $('.product-con').html('<p class="err-tip">商品信息加载失败，刷新下试试吧。</p>')
    })
  }
}
$(function(){
  page.init()
})