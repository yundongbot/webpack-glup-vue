'use strict'

export default function (router) {
  router.map({
    '/': {
      name: 'home',
      component: require('../views/index.vue'),
      title: 'HOME'
    },
    '/list': {
      name: 'list',
      component: require('../views/list.vue')
    },
    '/post/:id': {
      name: 'post',
      component: require('../views/post.vue')
    }
  })
}
