import './index.css'
import _mm from 'utils/mm.js'
import 'pages/common/nav/index.js'
import 'pages/common/header/index.js'
import _product from 'service/product-service.js'
import _cart from 'service/cart-service.js'
import templateIndex from './index.string'


var page = {
  data: {
    productId: _mm.getUrlParam('productId') || ''
  },
  init: function () {
    this.onLoad()
    this.bindEvent()
  },
  onLoad:function () {
    // 没有 productId 跳回首页
    if(!this.data.productId){
      _mm.goHome()
    } else {
      this.loadDetail()
    }
  },
  bindEvent:function () {
    var _this = this
    // 图片预览
    $(document).on('mouseenter', '.p-img-item', function () {
      var imgUrl = $(this).find('.p-img').attr('src')
      $('.main-img').attr('src', imgUrl)
    })
    // 数量操作
    $(document).on('click', '.p-count-btn', function () {
        console.log(11)
      var type = $(this).hasClass('plus') ? 'plus' : 'minus', 
          $pCount = $('.p-count'),
          currCount = parseInt($pCount.val()),
          minCount  = 1,
          maxCount  =  _this.data.detailInfo.stock || 1
      if (type === 'plus') {
        $pCount.val(currCount < maxCount ? currCount + 1 : maxCount)
      } else if (type === 'minus') {
        $pCount.val(currCount > minCount ? currCount - 1 : minCount)
      }
    })
    // 加入购物车
    $(document).on('click', '.cart-add', function () {
      _cart.addToCart({
        productId: _this.data.productId,
        count: $('.p-count').val()
      }, function (res) {
          window.location.href = './result.html?type=cart-add'
      }, function (errorMsg) {
        _mm.errorTips(errorMsg)
      })
    })
  },
  loadDetail: function () {
    var html = '', $pageWrap = $('.page-wrap'), _this = this
    $pageWrap.html('<div class="loading"></div>')
    _product.getProdunctDetail(this.data.productId, function(res){
      _this.filter(res)
      _this.data.detailInfo = res
      html = _mm.renderHtml(templateIndex, res)
      $pageWrap.html(html)
    },function(errorMsg){
        $pageWrap.html('<p class="err-tip">此商品太淘气找不到了</p>')
    })
  },
  filter: function (data) {
    data.subImages = data.subImages.split(',')
  }
}

$(function () {
  page.init()
})