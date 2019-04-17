<template>
    <div class="rank" ref="rank">
        <scroll :data="topList" class="toplist" ref="toplist">
            <div>
                <div class="recommend-list">
                    <ul class="list-content">
                        <li class="Songitem" @click="loadRankSongList(item)" v-if="index < 4" v-for="(item,index) in topList">
                            <div class="infoImg">
                                <img @load="loadImage" v-lazy="item.coverImgUrl" class="imgInfo"/>
                            </div>
                            <div class="info">
                                <div v-for="(song,count) in item.tracks" class="one">
                                    <p class="song">{{count+1}}. {{song.first}} - {{song.second}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="recommend-list">
                    <h1 class="list-title" v-show="topList.length>0">推荐榜</h1>
                    <ul class="list-content">
                        <Row :gutter="4" type="flex" justify="space-between" class="code-row-bg">
                            <Col span="8" v-if="index > 3 && index < 10" :key="index" v-for="(item,index)  in topList"
                                 style="margin-bottom: 10px;">
                                <li class="item" @click="loadRankSongList(item)">
                                    <div class="icon">
                                        <img @load="loadImage" width="100%" height="100%" v-lazy="item.coverImgUrl">
                                    </div>
                                    <div class="text">
                                        <p class="name" v-html="item.name"></p>
                                    </div>
                                </li>
                            </Col>
                        </Row>
                    </ul>
                </div>

                <div class="recommend-list">
                    <h1 class="list-title" v-show="topList.length>0">全球榜</h1>
                    <ul class="list-content">
                        <Row :gutter="4" type="flex" justify="space-between" class="code-row-bg">
                            <Col span="8" v-if="index > 10" :key="index" v-for="(item,index)  in topList"
                                 style="margin-bottom: 10px;">
                                <li class="item" @click="loadRankSongList(item)">
                                    <div class="icon">
                                        <img @load="loadImage" width="100%" height="100%" v-lazy="item.coverImgUrl">
                                    </div>
                                    <div class="text">
                                        <p class="name" v-html="item.name"></p>
                                    </div>
                                </li>
                            </Col>
                        </Row>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!topList.length">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
    import Scroll from 'components/scroll'
    import Loading from 'components/loading'
    import {playlistMixin} from '../common/js/mixin'
    import {mapMutations} from 'vuex'

    export default {
        mixins: [playlistMixin],
        name: "rank",
        data() {
            return {
                topList: []
            }
        },
        components: {
            Scroll,
            Loading
        },
        methods: {
            handlePlayList(playList) {
                const bottom = playList.length > 0 ? '60px' : '';
                this.$refs.rank.style.bottom = bottom;
                this.$refs.toplist.refresh();
            },
            loadRank() {
                var v = this;
                v.$axios.get('api/toplist/detail')
                    .then(response => {
                        //console.log(response.data.list);
                        if (response.data.code === 200) {
                            v.topList = response.data.list;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadImage() {
                if (!this.checkloaded) {
                    this.checkloaded = true;
                    setTimeout(() => {
                        this.$refs.toplist.refresh();
                    }, 20)
                }
            },
            loadRankSongList(rank) {
                // console.log(rank.name);
                this.$router.push({
                    path: `/rank/${rank.id}`
                });
                this.setRank(rank);
            },
            ...mapMutations({
                setRank: 'SET_RANK',
            })
        },
        mounted() {

        },
        created() {
            this.loadRank();
            // this.loadRankSongList("19723756");
        }
    }
</script>

<style scoped>
    .rank {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
    }

    .toplist {
        height: 100%;
        overflow: hidden;
    }

    .recommend-list {
    }

    .list-title {
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 16px;
        color: rgba(102, 153, 204, 0.8);
    }

    .list-content {
        padding: 0 2px 0px 2px;
    }

    .list-content li {
        list-style: none;
    }

    .list-content .item .icon img {
        border-radius: 2px;
    }

    .Songitem {
        display: flex;
        height: 130px;
        border-bottom: solid #e6e6e6 1px;
    }

    .Songitem .infoImg {
        position: relative;
        flex: 1;
        margin-top: 5px;
        float: left;
        margin-left: 5px;
    }

    .Songitem .imgInfo {
        width: 120px;
        height: 120px;
        border-radius: 2px;
    }

    .Songitem .info {
        position: relative;
        top: 16%;
        flex: 3;
        margin-left: 8px;
    }

    .Songitem .info .one {
        padding: 6px 0px 6px 0px;
    }

    .Songitem .info .one .song {
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
    }

</style>