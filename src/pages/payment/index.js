require('./index.css')
import _mm from 'utils/mm.js'
import 'pages/common/nav/index.js'
import 'pages/common/header/index.js'
import _payment from 'service/payment-service.js'
import templateIndex from './index.string'


var page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad()
    },
    onLoad: function () {
        this.loadPaymentInfo()
    },
    loadPaymentInfo: function () {
        var _this = this
        var paymentHtml = '', $pageWrap = $('.page-wrap')
        _payment.getPaymentInfo(_this.data.orderNumber, function (res) {
            paymentHtml = _mm.renderHtml(templateIndex, res)
            $pageWrap.html(paymentHtml)
            _this.listernOrderStatus()
        }, function (errorMsg) {
            $pageWrap.html('<p>' + errorMsg + '</p>')
        })
    },
    // 监听状态
    listernOrderStatus: function() {
        var _this = this
        this.paymentTimer = window.setInterval(function() {
            _payment.getPaymentStatus(_this.data.orderNumber, function(res){
                if (res == true) {
                    window.location.href = './result.html?type=payment&orderNumber' + _this.data.orderNumber
                } 
            })
        }, 5000)
    }
}
$(function () {
    page.init()
})