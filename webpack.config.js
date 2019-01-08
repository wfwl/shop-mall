const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin") 

const  WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'

const getHtmlConfig = function (name, title) {
  return {
    template: './src/view/'+ name +'.html',
      filename: 'view/'+ name +'.html',
      title: title,
      inject: true,
      hash: true,
      chunks: ['common', name]
  }
}

const config = {
  mode: WEBPACK_ENV === 'dev' ? 'development' : 'production',
  entry: {
    'common': ['./src/pages/common/index.js'],
    'list': ['./src/pages/list/index.js'],
    'cart': ['./src/pages/cart/index.js'],
    'index': ['./src/pages/index/index.js'],
    'detail': ['./src/pages/detail/index.js'],
    'login': ['./src/pages/login/index.js'],
    'result': ['./src/pages/result/index.js'],
    'passReset': ['./src/pages/passReset/index.js'],
    'register': ['./src/pages/register/index.js'],
    'passUpdate': ['./src/pages/passUpdate/index.js'],
    'userCenter': ['./src/pages/userCenter/index.js'],
    'orderConfirm': ['./src/pages/orderConfirm/index.js'],
    'userCenterUpdate': ['./src/pages/userCenterUpdate/index.js']
  },
  output: {
    filename: 'js/[name].js',
    publicPath: '/',
    path: path.resolve(__dirname, "dist")
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  resolve: {
    alias: {
      image: __dirname + '/src/image',
      pages: __dirname + '/src/pages',
      node_modules: __dirname + '/node_modules',
      service: __dirname + '/src/service',
      utils: __dirname + '/src/utils'
    }
  },
  devServer:{
		//设置服务器访问的基本目录
    contentBase:path.resolve(__dirname,'dist'),
		//服务器ip地址，localhost
    inline: true,
		port: 8088,
		open: true, // 自动打开浏览器
		hot: true // 2热更新
	},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          "css-loader"
        ]
      },
      {
        test: /\.string$/,
        use: [
          "html-loader"
        ]
      },
      {
        test:/\.(png|jpg|gif|woff|svg|ttf|eot|woff2)$/i,
        use:[
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              name: 'img/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          minSize: 0,
          chunks (chunk) {
            return ['common'].includes(chunk.name)
          }
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
  　　filename: "css/[name].css",
  　　chunkFilename: "css/[name].css"
　　 }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
    new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
    new HtmlWebpackPlugin(getHtmlConfig('orderConfirm', '订单确认')),
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情')),
    new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    new HtmlWebpackPlugin(getHtmlConfig('register', '注册')),
    new HtmlWebpackPlugin(getHtmlConfig('passReset', '找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('userCenter', '个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('userCenterUpdate', '个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('passUpdate', '修改密码'))
  ]
}

// if ('dev' === WEBPACK_ENV) {
//   config.entry.base.push('webpack-dev-server/client?http://localhost:8088/')
// }

module.exports = config