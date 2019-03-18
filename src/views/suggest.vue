<template>
    <scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="suggest">
        <ul class="suggest-list">
            <li class="suggest-item" @click="selectItem(item)" v-for="item in result">
                <div class="icon">
                    <i class="icon-music"></i>
                </div>
                <div class="name">
                    <p class="text">{{item.name}}</p>
                </div>
            </li>
            <loading v-show="hasMore" :title="title"></loading>
        </ul>
    </scroll>
</template>

<script>
    import Scroll from 'components/scroll';
    import Loading from 'components/loading'
    import {mapActions} from 'vuex'

    export default {
        name: "suggest",
        components: {
            Scroll,
            Loading
        },
        props: {
            query: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                page: 1, //搜索分页
                pageTotal: -1, //总分页数
                result: [],
                pullup: true, //是否启用上拉加载
                hasMore: true,  //是否有更多结果
                songCount: 0, // 搜索结果总数
                title: '',
                beforeScroll: true,
                insertSongUrl: '',
                insertSongDetail: {},
                waitInsertSong:{}
            }
        },
        methods: {
            refresh() {
                this.$refs.suggest.refresh();
            },
            search(keywords, page) {
                var v = this;
                v.hasMore = true;
                this.$refs.suggest.scrollTo(0, 0);
                v.$axios.get('api/search', {
                    params: {
                        keywords: keywords,
                        limit: 20,
                        offset: page - 1,
                    }
                }).then(response => {
                    //console.log(response);
                    if (response.data.code === 200) {
                        v.songCount = response.data.result.songCount;
                        v.result = response.data.result.songs;
                        //console.log(v.result);
                        if (v.pageTotal === -1) {
                            v.pageTotal = v.songCount % (v.result.length);
                            if (v.pageTotal === 0) {
                                v.pageTotal = v.songCount / (v.result.length);
                            } else {
                                v.pageTotal = (v.songCount / (v.result.length) + 1);
                            }
                        }
                        v.checkMore(v.pageTotal);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            loadMore(keywords, page) {
                var v = this;
                v.hasMore = true;
                v.$axios.get('api/search', {
                    params: {
                        keywords: keywords,
                        limit: 20,
                        offset: page - 1,
                    }
                }).then(response => {
                    //console.log(response);
                    if (response.data.code === 200) {
                        v.songCount = response.data.result.songCount;
                        v.result = v.result.concat(response.data.result.songs);
                        //console.log(v.result);
                        v.checkMore(v.pageTotal);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            searchMore() {
                if (!this.hasMore) {
                    return;
                } else {
                    this.page++;
                    this.loadMore(this.query, this.page);
                    // this.checkMore();
                }
            },
            /**
             * 如果当前返回值没有songList字段或者当前页数加1已经大于总页数
             * 则不能再进行上拉加载
             * @param pageTotal
             */
            checkMore(pageTotal) {
                //console.log(this.page);
                if ((this.page + 1) > pageTotal) {
                    this.hasMore = false;
                }
            },
            /**
             * 传入歌曲id，获取歌曲播放地址
             * @param list
             */
            loadSongUrl(song) {
                var v = this;
                v.$axios.get('api/song/url', {
                    params: {
                        id: song.id
                    }
                // }).then(response => {
                //     // console.log(response);
                //     if (response.data.code === 200) {
                //         v.insertSongUrl = response.data.data[0].url;
                //         // console.log("异步请求里面的地址:");
                //         // console.log(v.insertSongUrl);
                //     }
                // }).catch(error => {
                //     console.log(error);
                });
            },
            loadSongDetail(song) {
                var v = this;
                // let songDetail = {};
                return v.$axios.get('api/song/detail', {
                    params: {
                        ids: song.id
                    }
                // }).then(response => {
                //     //console.log(response);
                //     if (response.data.code === 200) {
                //         songDetail = response.data.songs[0];
                //         v.filterSinger(songDetail);
                //         v.insertSongDetail = songDetail;
                //         //console.log(v.insertSongDetail);
                //     }
                // }).catch(error => {
                //     console.log(error);
                });
            },
            selectItem(song) {
                //TODO 获取歌曲URL和detail之后再将歌曲插入到vuex里面
                // var v =this;
                // v.$axios.all([v.loadSongUrl(song),v.loadSongDetail(song)])
                //     .then(response =>{
                //         console.log(response);
                //         console.log(response[0]);
                //         // console.log(resUrl);
                //         // console.log(resDetail);
                //     }).catch(error =>{
                //     console.log(error);
                // })
                // var v =this;
                // v.loadSongUrl(song);
                // console.log(v.insertSongUrl);
                // v.loadSongDetail(song);
                // console.log(v.insertSongDetail);
                // //将歌曲信息整合到一起
                // v.manageSongInfo(v.insertSongUrl,v.insertSongDetail);
                // this.insertSong(this.waitInsertSong);

            },
            manageSongInfo(songurl, songDetail) {
                //console.log(songurl);
                // console.log(songDetail);
                let song = {
                    id: '',
                    name: '',
                    ar: '',
                    al: '',
                    imgURL: '',
                    songURL: '',
                    time: 0
                };
                song.id = songDetail.id;
                song.name = songDetail.name;
                song.ar = songDetail.ar;
                song.al = songDetail.al.name;
                song.imgURL = songDetail.al.picUrl;
                song.time = songDetail.dt;
                song.songURL = songurl;
                this.waitInsertSong = song;
                /**
                 * @insertsong 上次写到这里，点击了搜索结果中的某首歌，
                 * 根据歌曲ID去请求detail和播放地址URL
                 * 整合为一首歌的数据结构
                 * {
                 *      al: "绿色"
                        ar: "陈雪凝"
                        id: 1345848098
                        imgURL: "http://p1.music.126.net/R4ZP3AJ9xV0vvw8LX7AbMA==/109951163860425334.jpg"
                        name: "绿色"
                        songURL: "http://m10.music.126.net/20190314200006/1bcd419bed94d47ad5aa8b7b0aec5da1/ymusic/76b4/dcbb/0a65/9198b18815ee8ce42ae368ae29276f78.mp3"
                        time: 269590
                 * }
                 */
            },
            filterSinger(song) {
                let ret = [];
                let ar = '';
                song.ar.forEach((item) => {
                    ret.push(item.name);
                });
                ar = ret.join('/');
                song.ar = ar;
            },
            ...mapActions([
                'insertSong '
            ])
        },
        watch: {
            query() {
                this.result = [];
                this.page = 1;
                this.pageTotal = -1;
                this.songCount = 0;
                if (this.query) {
                    this.search(this.query, this.page);
                }
            }
        }
    }
</script>

<style scoped>
    @import '../common/css/icon.css';

    .suggest {
        height: 100%;
        overflow: hidden;
    }

    .suggest-list {
        padding: 0 30px;
    }

    .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
    }

    .suggest-item .icon {
        flex: 0 0 30px;
        width: 30px;
        font-size: 17px;
        /*color: $color-text-d*/
    }

    .icon-music {
        font-size: 17px;
    }

    .suggest-item .name {
        flex: 1;
        width: 90%;
        font-size: 14px;
        /*color: $color-text-d*/

    }

    .suggest-item .name .text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .no-result-wrapper {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }

</style>