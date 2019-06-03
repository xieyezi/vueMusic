<template>
    <div class="singer" ref="singer">
        <scroll ref="scroll" class="singer-content" :data="singerList">
            <div>
                <div class="categorycountry">
                    <ul>
                        <li class="item" v-for="(item,index) in singerCategroyByCountry"
                            @click="chooseSingerByCountry(index)">
                            <span :class="{itemactive:index === activeCountry}">{{item}}</span>
                        </li>
                    </ul>
                </div>
                <div class="categorysex">
                    <ul>
                        <li class="item" v-for="(item,index) in singerCategroyBySex" @click="chooseSingerBySex(index)">
                            <span :class="{itemactive:index === activeSex}">{{item}}</span>
                        </li>
                        <li class="item" ref="singerRank" @click="getSingerRank">
                            <span>歌手排行</span>
                        </li>
                    </ul>
                </div>
                <p class="title">热门歌手</p>
                <ul v-if="!isChoose">
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
                <ul v-if="isChoose">
                    <li v-for=" item in singerListChoose" class="SingerlistChoose" @click="selectSinger(item)">
                        <div class="infoImgChoose">
                            <img v-lazy="item.img1v1Url" class="imgInfoChoose"/>
                        </div>
                        <div class="descChoose">
                            <h3 class="nameChoose">{{item.name}}</h3>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="loading-container" v-show="(!singerList.length && isChoose === false) ||(!singerListChoose.length&& isChoose === true)">
                <loading></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
    import Scroll from 'components/scroll';
    import Loading from 'components/loading'
    import {mapMutations} from 'vuex'
    import {playlistMixin} from '../common/js/mixin'

    export default {
        mixins: [playlistMixin],
        name: "singer",
        data() {
            return {
                singerList: [],
                singerListChoose: [],
                isChoose: false,
                activeCountry: -1,
                activeSex: -1,
                singerCategroyByCountry: [
                    '华语',
                    '欧美',
                    '日本',
                    '韩国',
                    '其他',
                ],
                singerCategroyBySex: [
                    '男',
                    '女',
                    '乐队/组合',
                ]
            }
        },
        components: {
            Loading,
            Scroll
        },
        methods: {
            handlePlayList(playList) {
                const bottom = playList.length > 0 ? '60px' : '';
                this.$refs.singer.style.bottom = bottom;
                this.$refs.scroll.refresh();
            },
            chooseSingerByCountry(index) {
                this.isChoose = true;
                this.singerListChoose = [];
                this.activeCountry = index;
                this.$refs.singerRank.style.color = '#666';
                if (this.activeSex === -1) {
                    //默认选择男歌手
                    this.activeSex = 0;
                }
                switch (index) {
                    case 0: {
                        if (this.activeSex === 0) {
                            this.loadSingerBychoose('1001');
                        } else if (this.activeSex === 1) {
                            this.loadSingerBychoose('1002');
                        } else {
                            this.loadSingerBychoose('1003');
                        }
                    }
                        break;
                    case 1: {
                        if (this.activeSex === 0) {
                            this.loadSingerBychoose('2001');
                        } else if (this.activeSex === 1) {
                            this.loadSingerBychoose('2002');
                        } else {
                            this.loadSingerBychoose('2003');
                        }
                    }
                        break;
                    case 2: {
                        if (this.activeSex === 0) {
                            this.loadSingerBychoose('6001');
                        } else if (this.activeSex === 1) {
                            this.loadSingerBychoose('6002');
                        } else {
                            this.loadSingerBychoose('6003');
                        }
                    }
                        break;
                    case 3: {
                        if (this.activeSex === 0) {
                            this.loadSingerBychoose('7001');
                        } else if (this.activeSex === 1) {
                            this.loadSingerBychoose('7002');
                        } else {
                            this.loadSingerBychoose('7003');
                        }
                    }
                        break;
                    case 4: {
                        if (this.activeSex === 0) {
                            this.loadSingerBychoose('4001');
                        } else if (this.activeSex === 1) {
                            this.loadSingerBychoose('4002');
                        } else {
                            this.loadSingerBychoose('4003');
                        }
                    }
                        break;
                }
            },
            chooseSingerBySex(index) {
                this.isChoose = true;
                this.singerListChoose = [];
                this.$refs.singerRank.style.color = '#666';
                //如果没勾选国籍，则默认为华语
                if (this.activeCountry === -1) {
                    this.activeCountry = 0;
                }
                this.activeSex = index;
                switch (index) {
                    case 0: {
                        switch (this.activeCountry) {
                            case 0: {
                                this.loadSingerBychoose('1001');
                            }
                                break;
                            case 1: {
                                this.loadSingerBychoose('2001');
                            }
                                break;
                            case 2: {
                                this.loadSingerBychoose('6001');
                            }
                                break;
                            case 3: {
                                this.loadSingerBychoose('7001');
                            }
                                break;
                            case 4: {
                                this.loadSingerBychoose('4001');
                            }
                                break;
                        }
                    }
                        break;
                    case 1: {
                        switch (this.activeCountry) {
                            case 0: {
                                this.loadSingerBychoose('1002');
                            }
                                break;
                            case 1: {
                                this.loadSingerBychoose('2002');
                            }
                                break;
                            case 2: {
                                this.loadSingerBychoose('6002');
                            }
                                break;
                            case 3: {
                                this.loadSingerBychoose('7002');
                            }
                                break;
                            case 4: {
                                this.loadSingerBychoose('4002');
                            }
                                break;
                        }
                    }
                        break;
                    case 2: {
                        switch (this.activeCountry) {
                            case 0: {
                                this.loadSingerBychoose('1003');
                            }
                                break;
                            case 1: {
                                this.loadSingerBychoose('2003');
                            }
                                break;
                            case 2: {
                                this.loadSingerBychoose('6003');
                            }
                                break;
                            case 3: {
                                this.loadSingerBychoose('7003');
                            }
                                break;
                            case 4: {
                                this.loadSingerBychoose('4003');
                            }
                                break;
                        }
                    }
                        break;
                }
            },
            getSingerRank() {
                this.$refs.singerRank.style.color = '#df3336';
                this.activeCountry = -1;
                this.activeSex = -1;
                this.isChoose = false;
                this.loadSingerHot();
            },
            loadSingerHot() {
                var v = this;
                this.singerList = [];
                v.$axios.get('api/toplist/artist')
                    .then(response => {
                        //console.log(response.data.list.artists);
                        if (response.data.code === 200) {
                            v.singerList = response.data.list.artists;
                            /*
                            * 这里在第一个位置插入写夜子的信息
                            * */
                            let xieyezi = {
                                id: 12478216,
                                name: '写夜子',
                                score: 666,
                                topicPerson: 38,
                                img1v1Url: 'http://p4.music.126.net/9Go1z81prv-7oBQq6IG1Vg==/109951163419331306.jpg',
                            };
                            v.singerList.unshift(xieyezi);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadSingerBychoose(cat) {
                var v = this;
                v.$axios.get('api/artist/list', {
                    params: {
                        cat: cat,
                        limit: 50
                    }
                }).then(response => {
                    // console.log(response);
                    if (response.data.code === 200) {
                        //console.log(response.data.artists);
                        v.singerListChoose = response.data.artists;
                    }
                })
                    .catch(error => {
                        console.log(error);
                    });
            },
            selectSinger(singer) {
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
            this.loadSingerHot();
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

    .singer-content {
        height: 100%;
        overflow: hidden;
    }

    .Singerlist {
        height: 80px;
        display: flex;
        border-bottom: solid #e6e6e6 1px;
        justify-content: center;
        align-items: center;
    }

    .Singerlist .infoImg {
        flex: 2;
        margin-left: 10px;
    }

    .Singerlist .infoImg img {
        vertical-align: top;
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }

    .Singerlist .desc {
        vertical-align: top;
        flex: 7;
    }

    .SingerlistChoose {
        height: 80px;
        display: flex;
        border-bottom: solid #e6e6e6 1px;
        justify-content: center;
        align-items: center;
    }

    .SingerlistChoose .infoImgChoose {
        flex: 1;
        margin-left: 10px;
    }

    .SingerlistChoose .infoImgChoose img {
        vertical-align: top;
        width: 70px;
        height: 70px;
        border-radius: 50%;
    }

    .SingerlistChoose .descChoose {
        vertical-align: top;
        flex: 3;
    }

    .categorycountry {
        margin: 5px 10px 0 5px;
    }

    .categorycountry .item {
        display: inline-block;
        padding: 5px 15px;
        font-size: 14px;
        color: #666;
    }

    .categorysex {
        margin: 0 10px 0 5px;
    }

    .categorysex .item {
        display: inline-block;
        padding: 5px 15px;
        margin-right: 10px;
        font-size: 14px;
        color: #666;
    }

    .itemactive {
        color: #df3336;
    }
</style>