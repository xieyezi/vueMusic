<template>
  <div id="app">
    <div class="tophead">
      <MHead></MHead>
      <Tab></Tab>
    </div>
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
  </div>
</template>
<script>
    import MHead from 'components/mhead'
    import Tab from 'components/tab'
    export default {
        name: 'app',
        data() {
            return {}
        },
        components:{
            MHead,
            Tab
        }
    }
</script>
<style>
    *{
        margin: 0px;
    }
    .tophead{
      position: fixed;
      width: 100%;
    }
</style>
