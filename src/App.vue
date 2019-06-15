<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>
<script>
  import  {mapActions} from 'vuex'
  import FooterGuide from './components/footerGuide/FooterGuide'

  export default  {
    name:'App',
    components:{
      FooterGuide
    },
    mounted() {
      this.getUserInfo()
    },
    methods:{
      ...mapActions(['getUserInfo'])
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
