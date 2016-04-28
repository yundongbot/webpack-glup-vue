<template>
  <div class="page-cover"
      v-if="fixHead">
    </div>
  <header :class="fixHead" id="hd">
    <div class="nv-toolbar">
      <span v-text="pageType"></span>
    </div>
  </header>
</template>

<script>
  export default {
    replace:true,
    props: ['pageType','fixHead','messageCount','needAdd'],
    data (){
      return {
        nickname: '',
        profileimgurl: ''
      }
    }
  }
</script>

<style>
  #hd{
    &.fix-header {
      width: 100%;
      background-color: rgba(255, 255, 255, 0.95);
      position: fixed;
      top: 0;
      left: 0;
      transition: all .3s ease;
      box-shadow: 0 0 4px rgba(0,0,0,0.25);
      z-index: 6;
    }
  }
</style>
