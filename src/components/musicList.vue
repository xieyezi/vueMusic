<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back">
                <Icon type="md-arrow-back"/>
            </i>
        </div>
        <h1 class="title">{{singerInfo.name}}</h1>
        <div class="bg-image" :style="bgStyle">
            <div class="filter"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "musicList",
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
                songList: []
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
                if (!v.id) {
                    this.$router.push("/singer");
                    return;
                }
                v.$axios.get('api/artists', {
                    params: {
                        id: v.id
                    }
                }).then(response => {
                    //console.log(response.data.artist.img1v1Url);
                    if (response.data.code === 200) {
                        v.singerInfo = response.data.artist;
                        v.songList = response.data.hotSongs;
                        v.filterSinger(v.songList);
                        console.log(v.songList);
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
            back(){
                this.$router.back();
            }
        },
        created() {
            this.loadSingerSong();
        }
    }
</script>

<style scoped>
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
        font-size: 22px;
        color: rgb(102, 153, 204);
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
        color: rgba(102, 153, 204, 0.8);
    }

    .bg-image {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        transform-origin: top;
        background-size: cover;
    }
</style>