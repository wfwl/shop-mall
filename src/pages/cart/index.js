import './index.css'
import _mm from 'utils/mm.js'
import 'pages/common/header/index.js'
import nav from 'pages/common/nav/index.js'
import _cart from 'service/cart-service.js'
import templateIndex from './index.string'

var page = {
  data: {

  },
  init: function() {
    this.onLoad()
    this.bindEvent()
  },
  onLoad: function() {
    this.loadCart()
  },
  bindEvent: function() {
    var _this = this
    // 单选
    $(document).on('click', '.cart-select', function() {
      var $this = $(this), productId = $this.parents('.cart-table').data('product-id')
      if ($this.is(':checked')) {
        _cart.selectProduct(productId, function(res){
          _this.renderCart(res)
        }, function(errMsg){
          $('.page-warp').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>')
        })
      } else {
        _cart.unselectProduct(productId, function(res){
          _this.renderCart(res)
        }, function(errMsg){
          $('.page-warp').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>')
        })
      }
    })
    // 全选
    $(document).on('click', '.cart-select-all', function() {
      var $this = $(this)
      if ($this.is(':checked')) {
        _cart.selectAllProduct(function(res){
          _this.renderCart(res)
        }, function(errMsg){
          $('.page-warp').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>')
        })
      } else {
        _cart.unselectAllProduct(function(res){
          _this.renderCart(res)
        }, function(errMsg){
          $('.page-warp').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>')
        })
      }
    })
    // 商品数量
    $(document).on('click', '.count-btn', function() {
      var $this = $(this), $pCount = $this.siblings('.count-input'), 
          type = $this.hasClass('plus') ? 'plus' : 'minus',
          currCount = +$pCount.val(),
          minCount = 1,
          newCount = 0,
          maxCount = +$pCount.data('max'),
          productId = $this.parents('.cart-table').data('product-id')
      if (type === 'plus') {
        if (currCount >= maxCount) {
          _mm.errorTips('该商品数量已经到达上限')
          return
        }
        newCount = currCount + 1
      } else if (type === 'minus') {
        if (currCount <= minCount) {
          return
        }
        newCount = currCount - 1
      }
      _cart.updateProduct({
        productId: productId,
        count: newCount
      }, function(res) {
        _this.renderCart(res)
      }, function(errMsg) {
        _mm.errorTips(errMsg)
      })
    })
    // 删除单个商品
    $(document).on('click', '.cart-delete', function() {
      if (window.confirm('确认删除该商品？')){
        var productId = $(this).parents('.cart-table').data('product-id')
        _this.deleteCartProduct(productId)
      }
    })
    // 删除选中的商品
    $(document).on('click', '.delete-selected', function() {
      if (window.confirm('确认删除选中商品？')){
        var productIds = [], $selectedItem = $('.cart-select:checked'), iLength = $selectedItem.length
        for(var i = 0; i < iLength; i++) {
          productIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'))
        }
        if (productIds.length) {
          _this.deleteCartProduct(productIds.join(','))
        } else {
          _mm.errorTips('请选择要删除的商品')
        }
      }
    })
    // 提交购物车
    $(document).on('click', '.btn-submit', function() {
      if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
        window.location.href = './confirm.html'
      } else {
        _mm.errorTips('请选择商品')
      }
    })
  },
  loadCart: function(){
    var _this = this
    _cart.getCartList(function(res){
      // 获取购物车列表
      _this.renderCart(res)
    },function(errMsg){
      $('.page-warp').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>')
    })
  },
  // 数据匹配
  filter: function (data) {
    data.notEmpty = !!data.cartProductVoList.length
  },
  // 渲染购物车
  renderCart: function (data) {
    this.filter(data)
    this.data.cartInfo = data
    var cartHtml = _mm.renderHtml(templateIndex, data)
    $('.page-wrap').html(cartHtml)
    nav.loadCartCount()
  },
  deleteCartProduct: function(productIds) {
    var _this = this
    _cart.deleteProduct(productIds, function(res){
      _this.renderCart(res)
    },function(errMsg){
      $('.page-warp').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>')
    })
   }
}

$(function(){
  page.init()
})