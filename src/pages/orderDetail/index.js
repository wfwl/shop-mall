require('./index.css')
import _mm from 'utils/mm.js'
import 'pages/common/nav/index.js'
import navSide from 'pages/common/nav-side/index.js'
import 'pages/common/header/index.js'
import _order from 'service/order-service.js'
import templateIndex from './index.string'


var page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad()
    },
    onLoad: function () {
        this.loadDetail()
        this.bindEvent()
        navSide.init({
            name: 'order-list'
        })
    },
    bindEvent: function () {
        var _this = this
        $(document).on('click', '.order-cancel', function () {
            if (window.confirm('是否取消该订单么')) {
                _order.cancelOrder(_this.data.orderNumber, function (res) {
                    _mm.successTips('订单取消成')
                    _this.loadDetail()
                }, function (errMsg) {
                    _mm.errorTips(errMsg)
                })
            }
        })
    },
    loadDetail: function () {
        var _this = this
        var orderDetailHtml = '', $content = $('.content')
        _order.getOrderDetail(this.data.orderNumber, function (res) {
            _this.dataFilter(res)
            orderDetailHtml = _mm.renderHtml(templateIndex, res)
            $content.html(orderDetailHtml)
        }, function (errorMsg) {
            $content.html('<p>' + errorMsg + '</p>')
        })
    },
    dataFilter: function (data) {
        data.needPay = data.status == 10
        data.isCancelable = data.status == 10
    }
}
$(function () {
    page.init()
})