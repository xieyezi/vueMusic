<template>
  <div class="loading">
    <img width="40" height="30" src="http://pohm05hj4.bkt.clouddn.com/loading.gif">
    <p class="desc" :class="themeNumber">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  export default {
    props: {
      title: {
        type: String,
        default: '玩命载入中...'
      }
    },
    computed: {
      themeNumber() {
        return this.theme === 0 ? 'theme1' : this.theme === 1 ? 'theme2' : 'theme3'
      },
      ...mapGetters([
        'theme',
      ])
    },
  }
</script>
<style scoped>
  .loading{
    width: 100%;
    text-align: center;
  }
  .desc{
    line-height: 20px;
    font-size: 12px;
  }
  .theme1{
    color: #ff7675;
  }
  .theme2{
    color: #87cbd8;
  }
  .theme3{
    color: #D6A2E8;
  }
</style>
