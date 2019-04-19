<template>
    <transition name="slide">
        <div class="user-center">
            <div :class="themeBackgroud">
                <div class="back" @click="back">
                    <i class="icon-backgray"></i>
                </div>
                <div class="switches-wrapper">
                    <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
                </div>
                <div ref="playBtn" class="play-btn" :class="themeNumber" @click="random">
                  <span class="themeplay">
                       <Icon type="ios-play-outline"/>
                    </span>
                    <span class="text">随机播放全部</span>
                </div>
                <div class="list-wrapper" ref="listWrapper">
                    <scroll ref="favoriteList" class="list-scroll" v-if="currentIndex===0" :data="favoriteList">
                    <div class="list-inner">
                    <song-list :songs="favoriteList" @select="selectSong"></song-list>
                    </div>
                    </scroll>
                    <scroll ref="playList" class="list-scroll" v-if="currentIndex===1" :data="playHistory">
                        <div class="list-inner">
                            <song-list :songs="playHistory" @select="selectSong"></song-list>
                        </div>
                    </scroll>
                </div>
                <!--<div class="no-result-wrapper" v-show="noResult">-->
                <!--<no-result :title="noResultDesc"></no-result>-->
                <!--</div>-->
            </div>

        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import Switches from './switches'
    import Scroll from './scroll'
    import SongList from './songList'
    import NoResult from './no-result'
    import {mapGetters, mapActions} from 'vuex'
    import {playlistMixin} from '../common/js/mixin'
    export default {
        mixins: [playlistMixin],
        data() {
            return {
                currentIndex: 0,
                switches: [
                    {
                        name: '我喜欢的'
                    },
                    {
                        name: '最近听的'
                    }
                ]
            }
        },
        computed: {
            // noResult() {
            //     if (this.currentIndex === 0) {
            //         return !this.favoriteList.length
            //     } else {
            //         return !this.playHistory.length
            //     }
            // },
            // noResultDesc() {
            //     if (this.currentIndex === 0) {
            //         return '暂无收藏歌曲'
            //     } else {
            //         return '你还没有听过歌曲'
            //     }
            // },
            themeNumber() {
                return this.theme === 0 ? 'theme1' : this.theme === 1 ? 'theme2' : 'theme3'
            },
            themeBackgroud(){
                return this.theme === 0 ? 'theme1backgroud' : this.theme === 1 ? 'theme2backgroud' : 'theme3backgroud'
            },
            ...mapGetters([
                'favoriteList',
                'playHistory',
                'theme'
            ])
        },
        methods: {
            handlePlayList(playList) {
                const bottom = playList.length > 0 ? '60px' : '';
                this.$refs.listWrapper.style.bottom = bottom;
                this.$refs.favoriteList && this.$refs.favoriteList.refresh();
                this.$refs.playList && this.$refs.playList.refresh();
            },
            switchItem(index) {
                this.currentIndex = index;
            },
            selectSong(song) {
                //网易云的歌曲播放地址有时间检测,所以需要重新获取
                this.loadSongUrl(song.id).then(response => {
                    // console.log(response.data.data[0].url);
                    if (response.data.code === 200) {
                        let newSong = {
                            id: '',
                            name: '',
                            ar: '',
                            al: '',
                            imgURL: '',
                            songURL: '',
                            time: 0
                        };
                        newSong.al = song.al;
                        newSong.ar = song.ar;
                        newSong.id = song.id;
                        newSong.imgURL = song.imgURL;
                        newSong.name = song.name;
                        newSong.time = song.time;
                        newSong.songURL = response.data.data[0].url;
                        this.insertSong(newSong);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            loadSongUrl(id) {
                var v = this;
                return v.$axios.get('api/song/url', {
                    params: {
                        id: id
                    }
                });
            },
            back() {
                this.$router.back();
            },
            random() {
                // let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory;
                // if (list.length === 0) {
                //     return
                // }
                // list = list.map((song) => {
                //     return new Song(song);
                // });
                // if (this.playHistory.length === 0 ) {
                //     return;
                // }
                // this.randomPlay({
                //     list:this.playHistory
                // });
            },
            ...mapActions([
                'insertSong',
                'randomPlay'
            ])
        },
        components: {
            Switches,
            Scroll,
            SongList,
            NoResult
        }
    }
</script>

<style scoped>
    .user-center {
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 100;
        width: 100%;
        background: #fff;
    }

    .theme1 {
        color: #ff7675;
        border: 1px solid #ff7675;
    }

    .theme2 {
        color: #87cbd8;
        border: 1px solid #87cbd8;
    }

    .theme3 {
        color: #D6A2E8;
        border: 1px solid #D6A2E8;
    }

    .theme1backgroud {
        width: 100%;
        height: 100%;
        background: rgba(255,118,117,0.1);
    }

    .theme2backgroud {
        width: 100%;
        height: 100%;
        background: rgba(135,203,216,0.1);
    }

    .theme3backgroud {
        width: 100%;
        height: 100%;
        background: rgba(214,162,232,0.1);
    }

    .back {
        position: absolute;
        top: 10px;
        left: 6px;
        z-index: 50;
    }

    .icon-backgray {
        display: block;
        padding: 10px;
        font-size: 20px;
    }

    .switches-wrapper {
        padding: 10px 0 20px 0;
    }

    .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border-radius: 100px;
        font-size: 0;
    }

    .themeplay {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: 14px;
    }

    /*.icon-play {*/
    /*display: inline-block;*/
    /*vertical-align: middle;*/
    /*margin-right: 6px;*/
    /*font-size: 16px;*/
    /*}*/

    .text {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
    }

    .list-wrapper {
        position: absolute;
        top: 110px;
        bottom: 0;
        width: 100%;
    }

    .list-wrapper .list-scroll {
        height: 100%;
        overflow: hidden;
    }

    .list-wrapper .list-scroll .list-inner {
        padding: 20px 30px;
    }

    .no-result-wrapper {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }

    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }

</style>