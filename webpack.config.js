const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

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

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'development'

const config = {
  mode: WEBPACK_ENV,
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    publicPath: '/dist'
  },
  externals: {
    jquery: 'window.jQuery'
  },
  optimization: {
    splitChunks: {  //分割代码块
      cacheGroups: {  //缓存组 缓存公共代码
        common: { //公共模块 
          name: 'common',
          // 抽出入口文件中的common作为公共js
          chunks(chunk) {
            return chunk.name === 'common'
          },
          minSize: 0      //代码最小多大，进行抽离
        }
      }
    }
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
        test:/\.(png|jpg|gif|jpeg|woff|svg|ttf|eot|woff2)$/i,
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
  resolve: {
    alias: {
      image: __dirname + '/src/image',
      page: __dirname + '/src/page',
      node_modules: __dirname + '/node_modules',
      service: __dirname + '/src/service',
      util: __dirname + '/src/util'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css"
    }),
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('login', '登录'))
  ]
}
if (WEBPACK_ENV === 'development') {
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088')
}
module.exports = config