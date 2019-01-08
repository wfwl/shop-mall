import './index.css'
import _mm from 'utils/mm.js'
import 'pages/common/nav/index.js'
import 'pages/common/header/index.js'
import _product from 'service/product-service.js'
import pagination from 'utils/pagination/index.js'
import templateIndex from './index.string'
var page = {
  data: {
    listParam: {
      keyword: _mm.getUrlParam('keyword') || '',
      categoryId: _mm.getUrlParam('categoryId') || '',
      orderBy: _mm.getUrlParam('orderBy') || 'default',
      pageNum: _mm.getUrlParam('pageNum') || 1,
      pageSize: _mm.getUrlParam('pageSize') || 20
    }
  },
  init: function () {
    this.onLoad()
    this.bindEvent()
  },
  onLoad: function () {
    this.loadList()
  },
  bindEvent: function () {
    var _this = this
    $('.sort-item').click(function(){
      var $this  = $(this)
      _this.data.listParam.pageNum = 1
      if ($this.data('type') === 'default') {
        if ($this.hasClass('active')){
          return
        } else {
          $this.addClass('active').siblings('.sort-item').removeClass('active asc desc')
          _this.data.listParam.orderBy = 'default'
        }
      } else if ($this.data('type') === 'price') {
        $this.addClass('active').siblings('.sort-item').removeClass('active asc desc')
        if (!$this.hasClass('asc')) {
          $this.addClass('asc').removeClass('desc')
          _this.data.listParam.orderBy = 'price_asc'
        } else {
          $this.addClass('desc').removeClass('asc')
          _this.data.listParam.orderBy = 'price_desc'
        }
      }
      _this.loadList()
    })

  },
  // 加载list数据
  loadList: function () {
    var _this = this
    var listParam = this.data.listParam
    var listHtml = ''
    listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId)
    _product.getProductList(listParam,function(res){
      listHtml = _mm.renderHtml(templateIndex, {
        list: res.list
      })
      $('.p-list-con').html(listHtml)
      _this.loadPagination({
        hasPreviousPage: res.hasPreviousPage,
        prePage: res.prePage,
        hasNextPage: res.hasNextPage,
        nextPage: res.nextPage,
        pageNum: res.pageNum,
        pages: res.pages
      })
    },function(errorMsg){
        _mm.errorTips(errorMsg)
    })  
  },
  loadPagination: function (pageInfo) {
    var _this = this
    this.pagination ?  '': (this.pagination = new pagination())
    this.pagination.render($.extend({}, pageInfo, {
      container: $('.pagination'),
      onSelectPage: function(pageNum){
        _this.data.listParam.pageNum = pageNum
        _this.loadList()
      }
    }))
  }
}
$(function () {
  page.init()
})