var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');
var ROOT_PATH = path.resolve(__dirname);
var FE_PATH = path.resolve(ROOT_PATH, 'app/frontend');
var IMG_PATH = path.resolve(FE_PATH, 'assets/images');
var vue = require('vue-loader');
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  // 读取入口文件
  entry: {
    main: path.resolve(FE_PATH, 'main'),
    commons: ['vue']
  },

  // 将打包文件输出至bundle目录
  output: {
    path: path.resolve(ROOT_PATH, 'public/bundle'),
    publicPath: '/public/bundle',    // 配置相对路径
    filename: 'javascripts/[name].js'
  },

  devtool: '#source-map',

  // 热替换
  devServer: {
    historyApiFallback: true,
    progress: true,
    lazy: false,
    stats: { colors: true },
    // 所有请求由后端代理
    proxy: {
      '*': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  },

  module: {

    // loaders: 用于通过js模块化加载各种文件
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract('css-loader?sourceMap!autoprefixer-loader?browsers=last 3 versions')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap!autoprefixer-loader?browsers=last 3 versions!sass-loader')
      },
      {
        test: /\.jsx?$/,
        loader: 'babel!eslint',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url-loader?limit=3000&name=images/[name].[ext]',
        exclude: path.resolve(IMG_PATH, 'fonts')
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]'
      },
      {
        test: /\.(otf|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]',
      }
    ],
    // 提前加载，执行eslint代码检查
    perLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader'
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint'
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('commons', 'javascripts/commons.js'),
    new webpack.ProvidePlugin({
      $: 'webpack-zepto'
    }),
    // css单独输出为文件，交glup处理
    new ExtractTextPlugin('stylesheets/main.css'),
    // new ManifestPlugin({
    //   imageExtensions: /^(jpe?g|png|gif|svg|woff|woff2|otf|ttf|eot|svg)(\.|$)/i
    // })
  ]
}

// 多入口文件配置
// function getEntry() {
//   var dirs = fs.readdirSync(JS_PATH);
//   var matchs = [], files = {};
//   dirs.forEach(function (item) {
//     matchs = item.match(/(.+)\.js$/);
//     if (matchs) {
//       files[matchs[1]] = path.resolve(JS_PATH, item);
//     }
//   });
//   return files;
// }

function getPath () {
  var os = require('os');
  var IPv4,currentHost,path;

  currentHost = os.networkInterfaces().en0 || os.networkInterfaces().en0 ;

  for(var i=0;i<currentHost.length;i++){
    if(currentHost[i].family=='IPv4'){
      IPv4=currentHost[i].address;
    }
  }
  path = 'http://' + IPv4 + ':8888/public/bundle/';

  return path;
}
