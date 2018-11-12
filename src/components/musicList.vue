<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back">
                <!--<Icon type="ios-arrow-back" />-->
            </i>
        </div>
        <h1 class="title">{{singerInfo.name}}</h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <scroll @scroll="scroll" :probeType="probeType" :listenScroll="listenScroll" :data="songList" class="list"
                ref="list">
            <div class="song-list-warpper">
                <song-list @select="selectItem" :songs="songList"></song-list>
            </div>
            <div v-show="!songList.length" class="loading-container">
                <loading></loading>
            </div>
        </scroll>

    </div>
</template>

<script>
    import Scroll from "./scroll";
    import SongList from "./songList";
    import Loading from "./loading";
    import {mapActions} from 'vuex'


    const RESERVED_HEIGHT = 120;

    export default {
        name: "musicList",
        components: {
            SongList,
            Scroll,
            Loading
        },
        props: {
            id: {
                type: String,
                default: '',
                required: true
            }
        },
        data() {
            return {
                singerInfo: {},
                songList: [],
                scrollY: 0,
                probeType: 1
            }
        },
        computed: {
            bgStyle() {
                return `background-image:url(${this.singerInfo.img1v1Url})`;
            }
        },
        methods: {
            loadSingerSong() {
                var v = this;
                let list = [];
                if (!v.id) {
                    this.$router.push("/singer");
                    return;
                }
                v.$axios.get('api/artists', {
                    params: {
                        id: v.id
                    }
                }).then(response => {
                    //console.log(response.data);
                    if (response.data.code === 200) {
                        v.singerInfo = response.data.artist;
                        list = response.data.hotSongs;
                        v.filterSinger(list);
                        v.formatSongs(list);
                       // console.log(v.songList);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            filterSinger(songList) {
                songList.forEach((s) => {
                    let ret = [];
                    let ar = '';
                    s.ar.forEach((item) => {
                        ret.push(item.name);
                    });
                    ar = ret.join('/');
                    //console.log(ar);
                    s.ar = ar;
                });
            },
            formatSongs(list){
                for (let i = 0 ;i<list.length; i++) {
                    let song = {
                        id:'',
                        name:'',
                        ar:'',
                        al:'',
                        imgURL:'',
                        time:0
                    };
                    song.id = list[i].id;
                    song.name = list[i].name;
                    song.ar = list[i].ar;
                    song.al = list[i].al.name;
                    song.imgURL = list[i].al.picUrl;
                    song.time = list[i].dt;
                    this.songList.push(song);
                }

            },
            back() {
                this.$router.back();
            },
            scroll(pos) {
                this.scrollY = pos.y;
            },
            selectItem(item, index) {
                var v = this;
                v.selectPlay({
                    list: v.songList,
                    index: index
                })
            },
            ...mapActions([
                'selectPlay'
            ])
        },
        watch: {
            scrollY(newY) {
                let translateY = Math.max(this.minTranslateY, newY);
                let zIndex = 0;
                let scale = 1;
                let blur = 0;
                this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`;
                this.$refs.layer.style['webkitTransform'] = `translate3d(0,${translateY}px,0)`;
                //设置图片拖动放大缩小效果
                const percent = Math.abs(newY / this.imageHeight);
                if (newY > 0) {
                    scale = percent + 1;
                    zIndex = 10;
                } else {
                    blur = Math.min(20 * percent, 20);
                }
                //ios高斯模糊效果
                this.$refs.filter.style['backdrop-filter'] = `blur(${blur}px)`;
                this.$refs.filter.style['webkitBackdrop-filter'] = `blur(${blur}px)`
                if (newY < this.minTranslateY) {
                    zIndex = 10;
                    this.$refs.bgImage.style.paddingTop = 0;
                    this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
                } else {
                    //console.log(newY+","+this.minTranslateY);
                    this.$refs.bgImage.style.paddingTop = '70%';
                    this.$refs.bgImage.style.height = 0;
                }
                this.$refs.bgImage.style.zIndex = zIndex;
                this.$refs.bgImage.style['transform'] = `scale(${scale})`;
                this.$refs.bgImage.style['webkitTransform'] = `scale(${scale})`;
            }
        },
        mounted() {
            this.imageHeight = this.$refs.bgImage.clientHeight;
            this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
            this.$refs.list.$el.style.top = `${this.imageHeight}px`;
        },
        created() {
            this.loadSingerSong();
            this.probeType = 3;
            this.listenScroll = true;
        }
    }
</script>

<style scoped>
    @import '../common/css/icon.css';

    .music-list {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: #fff;
    }

    .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
    }

    .icon-back {
        display: block;
        padding: 10px;
        font-size: 25px;
        /*//color: rgb(102, 153, 204);*/
    }

    .title {
        position: absolute;
        top: 0;
        left: 10%;
        z-index: 40;
        width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        color: rgba(255, 255, 255, 0.9);
    }

    .bg-image {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        transform-origin: top;
        background-size: cover;

    }

    .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
    }

    .list {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;

        /*overflow: hidden;*/

    }

    .song-list-warpper {
        /*padding: 10px 30px;*/
        padding-left: 15px;
    }

    .bg-layer {
        position: relative;
        height: 100%;
        background: #fff
    }

</style>