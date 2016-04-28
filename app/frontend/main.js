'use strict'

import './assets/stylesheets/base.scss' // 基础依赖

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import validator from 'vue-validator'
import filters from './config/filters.js'
import routerMap from './config/routers.js'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(validator)

// $.ajaxSettings.crossDomain = true;

// 实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// 实例化VueRouter
let router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true
})

let app = Vue.extend({})

routerMap(router)

router.start(app, '#app')
