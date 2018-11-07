<template>
  <div class="loading">
    <img width="40" height="30" src="../common/image/loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
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
    color:rgba(102, 153, 204, 0.8);
  }
</style>
