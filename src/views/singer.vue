<template>
    <div class="singer">
        <div class="singer-Warpper" ref="singerWarpper">
           <div>
               <p class="title">热门</p>
               <ul>
                   <li v-for=" item in singerList" class="Singerlist" @click="selectSinger(item.id)">
                       <div class="infoImg">
                           <img   v-lazy="item.img1v1Url" class="imgInfo"/>
                       </div>
                       <div class="desc">
                           <h3 class="name">{{item.name}}</h3>
                           <span><Icon type="ios-flame-outline"/>{{item.score}}</span>
                           <p>有{{item.topicPerson}}人正在讨论<span style="color: rgb(102, 153, 204);">{{item.name}}</span></p>
                       </div>
                   </li>
               </ul>
           </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        name: "singer",
        data() {
            return {
                singerList: []
            }
        },
        components: {},
        methods: {
            loadSinger() {
                var v = this;
                v.$axios.get('api/toplist/artist')
                    .then(response => {
                        //console.log(response.datalist.artists);
                        if (response.data.code === 200) {
                            v.singerList = response.data.list.artists;
                            v.$nextTick(() =>{
                                if (!this.scroll) {
                                    this.scroll = new BScroll(this.$refs.singerWarpper, {
                                        click: true,
                                        probeType: 3
                                    });
                                    //console.log(this.scroll);
                                } else {
                                    this.scroll.refresh();
                                };
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            selectSinger(value){
                //console.log(value);
                this.$router.push({
                    path:'/singer/singerDetail',
                    query:{
                        id:value
                    }
                })
            }
        },
        components: {},
        created() {
            this.loadSinger();
        },
    }
</script>

<style scoped>
    .singer{
        position: fixed;
        width: 100%;
        top: 90px;
        bottom: 0;
    }
    .title{
        background: rgba(51,51,51,0.1);
        color:rgb(139,139,139);
        padding-left: 5px;
    }
    .singer-Warpper{
        height: 100%;
        overflow: hidden;
    }
    .Singerlist{
        height: 100px;
        display: flex;
        border-bottom: solid #e6e6e6 1px;
    }
    .Singerlist .infoImg{
        flex: 1;
        margin-top: 5px;
        margin-left: 5px;
    }
    .Singerlist .infoImg img{
        width: 85px;
        height: 85px;
    }
    .Singerlist .desc{
        flex:3;
        margin-top: 15px;
    }
</style>