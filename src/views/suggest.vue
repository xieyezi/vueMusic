<template>
    <scroll class="suggest"
            :data="result"
            :pullup="pullup"
            :beforeScroll="beforeScroll"
            @scrollToEnd="searchMore"
            @beforeScroll="listScroll" ref="suggest">
        <ul class="suggest-list">
            <li class="suggest-item" @click="selectItem(item)" v-for="item in result">
                <div class="icon">
<!--                    <i class="icon-music"></i>-->
                    <Icon type="ios-musical-notes-outline" />
                </div>
                <div class="name">
                    <p class="text">{{item.name}} - {{item.ar}}</p>
                </div>
            </li>
            <loading v-show="hasMore" :title="title"></loading>
        </ul>
        <div v-show="!hasMore && !result.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>

<script>
    import Scroll from 'components/scroll';
    import Loading from 'components/loading'
    import NoResult from '../components/no-result'
    import {mapActions} from 'vuex'

    export default {
        name: "suggest",
        components: {
            Scroll,
            Loading,
            NoResult
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
                beforeScroll: true
            }
        },
        methods: {
            refresh() {
                this.$refs.suggest.refresh();
            },
            search(keywords, page) {
                var v = this;
                let resultTemp = [];
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
                        if (v.songCount > 0) {
                            resultTemp = response.data.result.songs;
                            // console.log(resultTemp);
                            //计算总页数
                            if (v.pageTotal === -1 && resultTemp.length !== 0) {
                                v.pageTotal = v.songCount % (resultTemp.length);
                                if (v.pageTotal === 0) {
                                    v.pageTotal = v.songCount / (resultTemp.length);
                                } else {
                                    v.pageTotal = (parseInt(v.songCount / (resultTemp.length)) + 1);
                                }
                            }
                            //如果有结果，就去请求歌曲详情和播放地址
                            if (resultTemp.length > 0) {
                                v.$axios.all([v.loadSongUrl(resultTemp), v.loadSongDetail(resultTemp)])
                                    .then(v.$axios.spread((resUrl, resDetail) => {
                                        // console.log(resUrl);
                                        v.filterResult(resDetail.data.songs);
                                        // console.log(resDetail.data.songs);
                                        v.manageSongList(resDetail.data.songs, resUrl.data.data);
                                        // console.log(v.result);
                                        v.checkMore(v.pageTotal);
                                    })).catch(error => {
                                    console.log(error);
                                });
                            }
                        }else {
                            this.hasMore = false;
                        }
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
            loadMore(keywords, page) {
                var v = this;
                let resultTemp = [];
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
                        resultTemp = response.data.result.songs;
                        if (resultTemp.length>0){
                            v.$axios.all([v.loadSongUrl(resultTemp), v.loadSongDetail(resultTemp)])
                                .then(v.$axios.spread((resUrl, resDetail) => {
                                    // console.log(resUrl);
                                    v.filterResult(resDetail.data.songs);
                                    // console.log(resDetail.data.songs);
                                    v.manageSongList(resDetail.data.songs, resUrl.data.data);
                                    // console.log(v.result);
                                    v.checkMore(v.pageTotal);
                                })).catch(error => {
                                console.log(error);
                            });
                        }
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            listScroll() {
                this.$emit('listScroll');
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
            loadSongUrl(list) {
                var v = this;
                let songsIds = '';
                for (let i = 0; i < list.length; i++) {
                    //console.log(list[i].id);
                    songsIds += list[i].id + ',';
                }
                songsIds = songsIds.substring(0, songsIds.length - 1);
                // console.log(songsIds);
                return v.$axios.get('api/song/url', {
                    params: {
                        id: songsIds
                    }
                });
            },
            loadSongDetail(list) {
                var v = this;
                let songsIds = '';
                for (let i = 0; i < list.length; i++) {
                    songsIds += list[i].id + ',';
                }
                songsIds = songsIds.substring(0, songsIds.length - 1);
                return v.$axios.get('api/song/detail', {
                    params: {
                        ids: songsIds
                    }
                });
            },
            selectItem(song) {
                this.insertSong(song);
                //派发一个事件给父组件
                this.$emit('select', song);
            },
            manageSongList(list1, list2) {
                var v = this;
                for (let i = 0; i < list1.length; i++) {
                    let song = {
                        id: '',
                        name: '',
                        ar: '',
                        al: '',
                        imgURL: '',
                        songURL: '',
                        time: 0
                    };
                    song.id = list1[i].id;
                    song.name = list1[i].name;
                    song.ar = list1[i].ar;
                    song.al = list1[i].al.name;
                    song.imgURL = list1[i].al.picUrl;
                    song.time = list1[i].dt;
                    for (let m = 0; m < list2.length; m++) {
                        if (list1[i].id === list2[m].id) {
                            song.songURL = list2[m].url;
                            break;
                        }
                    }
                    v.result.push(song);
                }
            },
            filterResult(result) {
                result.forEach((song) => {
                    let ret = [];
                    let ar = '';
                    song.ar.forEach((item) => {
                        ret.push(item.name);
                    });
                    ar = ret.join('/');
                    song.ar = ar;
                });
            },
            ...mapActions([
                'insertSong'
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
    }
    .suggest-item .name {
        flex: 1;
        width: 90%;
        font-size: 14px;
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