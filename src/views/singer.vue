<template>
 <div class="singer">
     <list-view  :data="singerList" ref="list"></list-view>
 </div>
</template>

<script>
    import ListView from 'components/listview'
    export default {
        name: "singer",
        data (){
            return {
              singerList:[]
            }
        },
        components:{

        },
        methods:{
          loadSinger(){
              var v = this;
              v.$axios.get('api/top/artists')
                  .then(response => {
                      console.log(response.data.artists);
                      if (response.data.code === 200) {
                          v.singerList = response.data.artists;
                      }
                  })
                  .catch(error => {
                      console.log(error);
                  });
          }
        },
        components:{
            ListView
        },
        created(){
          this.loadSinger();
        },
    }
</script>

<style scoped>

</style>