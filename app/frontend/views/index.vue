<template>
  <div>
  <img src="../assets/images/slide1.png" alt="">
    <h1 v-link="{name:'list'}">去list页面</h1>
  </div>
</template>

<style lang="sass">

</style>

<script>
  import '../assets/images/slide1.png'

  export default {
    ready () {
      // this.$route.router.go({name: 'list'});
    }
  }
</script>
