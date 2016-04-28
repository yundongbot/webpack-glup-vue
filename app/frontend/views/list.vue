<template>
  <section id="history">
    <ol class="posts-list clearfix">
      <li v-for="item in posts"
          v-link="{name:'post',params:{id:item.id}}">
        <div class="img-box">
          <img :src="item.pic_key" >
          <div class="title">
            <time><span>12</span>DEC</time>
            <h1 v-text="item.title"></h1>
          </div>
        </div>
        <div class="info">
          <span class="tag"><span class="icon icon-tag"></span>{{item.tag}}</span>
          <span class="pv"><span class="icon icon-eye"></span>{{item.pv}}</span>
        </div>
      </li>
    </ol>
  </section>
</template>

<style lang="sass">

  @import '../assets/stylesheets/posts-list.scss';

  #history {
    @include rem(margin, 54px 0);
    background: green;
  }

</style>

<script>
  import $ from 'webpack-zepto'

  export default {
    data () {
      return {
        scroll: true,
        posts: [],
        searchKey: {
          page: 1,
          limit: 10
        },
        searchDataStr: ''
      }
    },
    route: {
      data (transition) {
        let _self = this
        console.log('aa')
        if (_self.searchDataStr === '') {
          _self.searchDataStr = JSON.stringify(_self.searchKey)
        }
        _self.getPosts()  // 默认加载

        $(window).on('scroll', () => {
          let totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop())

          if ($(document).height() <= totalheight + 200) {
            this.getScrollData()
          }
        })
      }
    },
    methods: {
      getPosts () {
        let _self = this
        let params = $.param(_self.searchKey)

        $.get('/event/detail?' + params, function (data) {
          _self.scroll = true

          if (data && data.posts) {
            _self.posts = _self.posts.concat(data.posts)
          }
        })
      },
      getScrollData () {
        let _self = this

        if (_self.scroll) {
          _self.scroll = false
          _self.searchKey.page += 1
          _self.getPosts()
        }
      }
    }
  }

</script>
