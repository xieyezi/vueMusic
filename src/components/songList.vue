<template>
 <div class="song-list">
     <ul>
         <li v-for="song in songs" class="item">
             <div class="content">
                 <h2 class="name">{{song.name}}</h2>
                 <p class="desc">{{song.ar}} - {{song.al.name}}</p>
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
        }
    }
</script>

<style scoped>
      .song-list{
          /*margin-left: 15px;*/
      }
     .song-list .item{
         display: flex;
         align-items: center;
         box-sizing: border-box;
         height: 64px;
         font-size: 13px;
         border-bottom: solid #e6e6e6 1px;
     }
      .song-list .content{
          flex: 1;
          line-height: 20px;
          overflow: hidden;
      }
      .content .name{
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          color: rgba(0,0,0,1);
          font-size: 14px;
      }
      .content .desc{
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          margin-top: 4px;
          color:rgba(0,0,0,0.6);
          font-size: 12px;
      }

</style>