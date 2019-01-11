require('./index.css')
import _mm from 'utils/mm.js'
import 'pages/common/nav/index.js'
import navSide from 'pages/common/nav-side/index.js'
import pagination from 'utils/pagination/index.js'
import 'pages/common/header/index.js'
import _order  from 'service/order-service.js'
import templateIndex from './index.string'


var page = {
  data: {
    listParam: {
      pageNum: 1,
      pageSize: 10
    }
  },
  init: function () {
    this.loadOrderList()
    this.onLoad()
  },
  onLoad: function () {
    navSide.init({
      name: 'order-list'
    })
    this.loadOrderList()
  },
  // 订单列表
  loadOrderList: function () {
    var _this = this
    var orderListHtml = '', $listCon = $('.order-list-con')
    _order.getOrderList(this.data.listParam, function(res){
      orderListHtml = _mm.renderHtml(templateIndex, res)
      $listCon.html(orderListHtml)
      _this.loadPagination({
        hasPreviousPage: res.hasPreviousPage,
        prePage: res.prePage,
        hasNextPage: res.hasNextPage,
        nextPage: res.nextPage,
        pageNum: res.pageNum,
        pages: res.pages
      })
    }, function(errorMsg){
      $listCon.html('<p>加载订单失败，请刷新后重试</p>')
    })
  },
  // 分页信息
  loadPagination: function (pageInfo) {
    var _this = this
    this.pagination ?  '': (this.pagination = new pagination())
    this.pagination.render($.extend({}, pageInfo, {
      container: $('.pagination'),
      onSelectPage: function(pageNum){
        _this.data.listParam.pageNum = pageNum
        _this.loadOrderList()
      }
    }))
  }
}
$(function () {
  page.init()
})