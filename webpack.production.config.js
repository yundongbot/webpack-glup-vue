var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require('fs');
var ROOT_PATH = path.resolve(__dirname);
var FE_PATH = path.resolve(ROOT_PATH, 'app/frontend');
var IMG_PATH = path.resolve(FE_PATH, 'assets/images');
var ManifestPlugin = require('webpack-manifest-plugin');
var vue = require("vue-loader");

module.exports = {
  // 读取入口文件
  entry: {
    main: path.resolve(FE_PATH, 'main'),
    commons: ['vue']
  },

  // 将打包文件输出至bundle目录
  output: {
    path: path.resolve(ROOT_PATH, 'public/bundle'),
    publicPath: "http://77g98s.com1.z0.glb.clouddn.com/",    // 配置CDN
    filename: "javascripts/[name].js"
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
        loaders: ExtractTextPlugin.extract("css-loader!autoprefixer-loader?browsers=last 3 versions")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css-loader!autoprefixer-loader?browsers=last 3 versions!sass-loader")
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
        loader: "url-loader?limit=3000&name=images/[name].[hash:8].[ext]",
        exclude: path.resolve(IMG_PATH, 'fonts')
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[hash:8].[ext]",
      },
      {
        test: /\.(otf|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=[name].[hash:8].[ext]",
      }
    ]
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract("css-loader!autoprefixer-loader?browsers=last 3 versions!sass-loader"),
      sass: ExtractTextPlugin.extract("css-loader!autoprefixer-loader?browsers=last 3 versions!sass-loader"),
      js: 'babel!eslint'
    }
  },
  // watch: true,
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("commons", "javascripts/commons.js"),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      minimize: true
    }),
    new webpack.ProvidePlugin({
      $: 'webpack-zepto'
    }),
    // css单独输出为文件，交glup处理上传
    new ExtractTextPlugin("stylesheets/main.css", {
      allChunks: true,
      disable: false
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}

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
