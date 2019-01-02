require('./index.css')
var _mm = require('utils/mm.js')
var header = {
  init: function () {
    this.bindEvent()
  },
  onLoad: function () {
    var keyWord = _mm.getUrlParam('keyword')
    if (keyWord) {
      $('#search-input').val(keyWord)
    }
  },
  bindEvent: function () {
    var _this = this
    $('#search-btn').click(function() {
      _this.searchSubmit()
    })
    // 回车搜索
    $('#search-input').keyup(function(e){
      if (e.keyCode === 13) {
        _this.searchSubmit()
      }
    })
  },
  // 搜索框搜索事件
  searchSubmit: function() {
    var keyWord = $.trim($('#search-input').val())
    if (keyWord) {
      window.location.href = './list.html?keyword=' + keyWord
    } else {
      _mm.goHome()
    }
  }
}
header.init()