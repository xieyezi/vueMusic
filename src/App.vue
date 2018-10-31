<template>
  <div id="app">
    <MHead></MHead>
    <Tab></Tab>
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
</style>
