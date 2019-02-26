<template>
    <div class="singer" ref="singer">
        <div class="singer-Warpper" ref="singerWarpper">
            <div>
                <p class="title">热门</p>
                <ul>
                    <li v-for=" item in singerList" class="Singerlist" @click="selectSinger(item)">
                        <div class="infoImg">
                            <img v-lazy="item.img1v1Url" class="imgInfo"/>
                        </div>
                        <div class="desc">
                            <h3 class="name">{{item.name}}</h3>
                            <span><Icon type="ios-flame-outline"/>{{item.score}}</span>
                            <p>有{{item.topicPerson}}人正在讨论<span style="color: rgb(102, 153, 204);">{{item.name}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="loading-container" v-show="!singerList.length">
                <loading></loading>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    import Loading from 'components/loading'
    import {mapMutations} from 'vuex'
    import {playlistMixin} from '../common/js/mixin'

    export default {
        // mixins: [playlistMixin],
        name: "singer",
        data() {
            return {
                singerList: []
            }
        },
        components: {
            Loading
        },
        methods: {
            // handlePlayList(playList) {
            //     const bottom = playList.length > 0 ? '60px' : '';
            //     this.$refs.singerWarpper.style.bottom = bottom;
            //     this.scroll.refresh();
            // },
            loadSinger() {
                var v = this;
                v.$axios.get('api/toplist/artist')
                    .then(response => {
                        //console.log(response.datalist.artists);
                        if (response.data.code === 200) {
                            v.singerList = response.data.list.artists;
                            /*
                            * 这里在第一个位置插入写夜子的信息，嘻嘻
                            * */
                            let xieyezi = {
                                id: 12478216,
                                name: '写夜子',
                                score: 666,
                                topicPerson: 38,
                                img1v1Url: 'http://p4.music.126.net/9Go1z81prv-7oBQq6IG1Vg==/109951163419331306.jpg',
                            };
                            v.singerList.unshift(xieyezi);
                            v.$nextTick(() => {
                                if (!this.scroll) {
                                    this.scroll = new BScroll(this.$refs.singerWarpper, {
                                        click: true,
                                        probeType: 3
                                    });
                                    //console.log(this.scroll);
                                } else {
                                    this.scroll.refresh();
                                }
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            selectSinger(singer) {
                //console.log();
                this.$router.push({
                    path: '/singer/singerDetail',
                    query: {
                        id: singer.id
                    }
                });
                this.setSinger(singer);
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        },
        created() {
            this.loadSinger();
        }
    }
</script>

<style scoped>
    .singer {
        position: fixed;
        width: 100%;
        top: 90px;
        bottom: 0;
    }

    .title {
        background: rgba(51, 51, 51, 0.1);
        color: rgb(139, 139, 139);
        padding-left: 5px;
    }

    .singer-Warpper {
        height: 100%;
        overflow: hidden;
    }

    .Singerlist {
        height: 80px;
        display: flex;
        border-bottom: solid #e6e6e6 1px;
    }

    .Singerlist .infoImg {
        flex: 2;
        margin-top: 5px;
        margin-left: 10px;
    }

    .Singerlist .infoImg img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }

    .Singerlist .desc {
        flex: 7;
        margin-top: 15px;
    }
</style>