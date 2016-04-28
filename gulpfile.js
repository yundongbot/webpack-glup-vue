'use strict'

var gulp = require('gulp'),
    webpack = require('webpack'),
    runSequence = require('run-sequence'),
    qiniuConfig = {},
    webpackConfig = require('./webpack.production.config');
    NODE_ENV = process.env.NODE_ENV;
    // rename = require('gulp-rename'),
    // concat = require('gulp-concat'),
    // del = require('del'),
    // watch = require('gulp-watch');

// 上传七牛
var qn = require('gulp-qn');

// MD5戳
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

if (NODE_ENV = "test") {
  qiniuConfig = {
    accessKey: '',
    secretKey: '',
    bucket: '',
    origin: '7'
  };
} else if (NODE_ENV = "production") {
  qiniuConfig = {
    accessKey: '',
    secretKey: '',
    bucket: '',
    origin: ''
  };
}

/**
 *  执行webpack打包
 */
gulp.task('webpack', function(cb) {
  webpack(webpackConfig, cb)
});

/**
 *  生产环境
 */
gulp.task('publish', ['webpack'], function (callback) {
  runSequence('publish-css', callback);
});

/**
 *  js、css添加hash后上传
 */
gulp.task('publish-css', function () {
  return gulp.src(['./public/bundle/stylesheets/*.css', './public/bundle/javascripts/*.js'])
    .pipe(rev())
    .pipe(gulp.dest('./public/bundle/build'))
    .pipe(qn({
      qiniu: qiniuConfig,
      prefix: 'assets'
    }))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./public/bundle/manifest'));
});

/**
 *  图片上传
 */
gulp.task('publish-img', function() {
  return gulp.src('./public/bundle/images/*')
    .pipe(qn({
      qiniu: qiniuConfig,
      prefix: 'images'
    }))
});

/**
 *  字体上传
 */
gulp.task('publish-fonts', function() {
  return gulp.src('./public/bundle/images/fonts/*')
    .pipe(qn({
      qiniu: qiniuConfig,
      prefix: 'images/fonts'
    }))
});
