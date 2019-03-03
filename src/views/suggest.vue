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
                insertSong: {} //格式化之后的待插入歌曲
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
                        console.log(v.result);
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
                }).then(response => {
                    //console.log(response);
                    if (response.data.code === 200) {
                        v.insertSongUrl = response.data.data[0].url;
                        console.log("异步请求里面的地址:")
                        console.log(v.insertSongUrl);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            loadSongDetail(song) {
                var v = this;
                let songDetail = {};
                v.$axios.get('api/song/detail', {
                    params: {
                        ids: song.id
                    }
                }).then(response => {
                    //console.log(response);
                    if (response.data.code === 200) {
                        songDetail = response.data.songs[0];
                        v.filterSinger(songDetail);
                        v.insertSongDetail = songDetail;
                        //console.log(v.insertSongDetail);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            selectItem(song) {
                //先格式化歌曲，然后插入到列表
                this.loadSongUrl(song);
                this.loadSongDetail(song);
                console.log("播放地址:");
                console.log(this.insertSongUrl);
                // console.log("歌曲详情:");
                // console.log(this.insertSongDetail);
                //this.insertSong(this.insertSong);

            },
            manageSongInfo(songurl, songDetail) {
                // console.log(songDetail);
                // console.log(songurl);
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
                this.insertSong = song;
                // console.log(this.insertSong);
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