<template>
    <transition name="slide">
        <MusciList :title="title" :bgImage="bgImage" :songList="songList"></MusciList>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    import MusciList from 'components/musicList'
    export default {
        name: "singerDetail",
        data() {
            return {
                id: '',
                singerInfo: {},
                songList: [],
            }
        },
        computed: {
            title(){
                return this.singerInfo.name;
            },
            bgImage(){
                return this.singerInfo.img1v1Url;
            },
            ...mapGetters([
                'singer'
            ])
        },
        components:{
            MusciList
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
        },
        created() {
            this.id = decodeURIComponent(this.$route.query.id);
            this.loadSingerSong();
        }
    }
</script>

<style scoped>
    .singerDetail {
        position: fixed;
        z-index: 100;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background: gray;
    }

    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>