<template>
 <div class="song-list">
     <ul>
         <li @click="selectItem(song,index)"  v-for="(song,index) in songs" class="item">
             <div class="content">
                  <div class="count">{{index+1}}</div>
                  <div class="info">
                     <h2 class="name">{{song.name}}</h2>
                     <p class="desc">{{song.ar}} - {{song.al.name}}</p>
                  </div>
             </div>
         </li>
     </ul>
 </div>
</template>

<script>
    export default {
        name: "songList",
        props:{
            songs:{
                type:Array,
                default:[]
            }
        },
        methods:{
            selectItem(item,index){
                this.$emit('select',item,index);
            }
        }
    }
</script>

<style scoped>
      .song-list{
          /*margin-left: 15px;*/
      }
     .song-list .item{
         align-items: center;
         box-sizing: border-box;
         height: 60px;
         list-style: none;
         /*font-size: 13px;*/
         border-bottom: solid #e6e6e6 1px;
     }
      .song-list .content{
          display: flex;
          line-height: 20px;
          overflow: hidden;
          padding: 5px 0px 5px 0px;
          /*width: 100%;*/
      }
      .content .count{
          margin-top: 10px;
          margin-right: 8px;
          font-size: 15px;
      }
      .content .info{
      }
      .content .info .name{
          color: rgba(0,0,0,0.7);
          font-size: 14px;
      }
      .content .info .desc{
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          margin-top: 4px;
          color:rgba(0,0,0,0.6);
          font-size: 12px;
      }

</style>