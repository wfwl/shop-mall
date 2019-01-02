var Hogan = require('hogan.js')

var conf= {
  serverHost: ''
}
var _mm = {
  // 请求方法
  request: function (param) {
    var _this = this
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      success: function (res) {
        if (0 === res.status) {
          typeof param.success === 'function' && param.success(res.data, res.msg)
        } else if (10 === res.status) {
          _this.doLogin()
        } else if (1 === res.status) {
          typeof param.error === 'function' && param.error(res.msg)
        }
      },
      error: function (error) {
        typeof param.error === 'function' && param.error(error.statusText)
      }
    })
  },
  // 路径跳转
  doLogin: function () {
    window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
  },
  // 回到首页
  goHome: function () {
    window.location.href = './index.html'
  },
  // 获取服务器地址
  geServerUrl: function (path) {
    return conf.serverHost + path
  },
  // 获取地址栏参数
  getUrlParam: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
  },
  // 渲染html
  renderHtml: function (htmlTemplate, data) {
    var template = Hogan.compile(htmlTemplate)
    result = template.render(data)
    return result
  },
  // 成功提示
  successTips: function (msg) {
    alert(msg || 'success')
  },
  // 失败提示
  errorTips: function (msg) {
    alert(msg || 'fail')
  },
  vaildata: function (value, type) {
    var value = $.trim(value)
    // 非空验证
    if ('require' === type) {
      return !!value
    }
    // 手机号验证
    if ('phone' === type) {
      return /^1\d{10}$/.test(value)
    }
    // 邮箱格式验证
    if ('email' === type) {
      return /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(value)
    }
  }
}

module.exports = _mm