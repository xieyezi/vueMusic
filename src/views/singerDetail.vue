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
                songList: []
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
                        //console.log(list);
                        v.filterSinger(list);
                        v.formatSongs(list);

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
                    s.ar = ar;
                });
            },
            formatSongs(list){
                var  v = this;
                v.loadSongUrl(list);
            },
            loadSongUrl(list) {
                var v = this;
                var songsIds = '';
                var songUrlList = [];
                for (let i = 0; i < list.length; i++) {
                    songsIds += list[i].id +',';
                }
                songsIds = songsIds.substring(0,songsIds.length-1);
                //console.log(songsIds);
                v.$axios.get('api/song/url', {
                    params: {
                        id: songsIds
                    }
                }).then(response => {
                    //console.log(response.data.data);
                    if (response.data.code === 200) {
                        songUrlList = response.data.data;
                        //console.log(songUrlList);
                        v.manageSongList(list,songUrlList);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            manageSongList(list1,list2){
                var v = this;
                for (let i = 0;i<list1.length;i++){
                    let song = {
                        id:'',
                        name:'',
                        ar:'',
                        al:'',
                        imgURL:'',
                        songURL:'',
                        time:0
                    };
                    song.id = list1[i].id;
                    song.name = list1[i].name;
                    song.ar = list1[i].ar;
                    song.al = list1[i].al.name;
                    song.imgURL = list1[i].al.picUrl;
                    song.time = list1[i].dt;
                    for (let m = 0;m<list2.length;m++){
                        if (list1[i].id === list2[m].id) {
                            song.songURL = list2[m].url;
                        }
                    }
                    v.songList.push(song);
                }
                // console.log("songList：");
                // console.log(v.songList);
            }

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