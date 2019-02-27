<template>
    <transition name="slide">
        <music-list :title="title" :bgImage="bgImage" :songList="songList"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
    import MusicList from '../components/musicList'
    import {mapGetters} from 'vuex'
    // import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'

    export default {
        computed: {
            title() {
                return this.disc.name;
            },
            bgImage() {
                return this.disc.picUrl;
            },
            ...mapGetters([
                'disc'
            ])
        },
        data() {
            return {
                songList: []
            }
        },
        created() {
            //console.log(this.disc);
            this.getSongList();
        },
        methods: {
            getSongList() {
                var v = this;
                if (!this.disc.id) {
                    this.$router.push('/recommend');
                    return;
                }
                let list =[];
                v.$axios.get('api/playlist/detail', {
                    params: {
                        id: v.disc.id
                    }
                }).then(response => {
                    //console.log(response);
                    if (response.data.code === 200) {
                        list = response.data.privileges;
                        v.loadSongDetail(list);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            /**
             * 传入歌曲id，获取歌曲详情
             * @param list
             */
            loadSongDetail(list){
                var v = this;
                var songsIds = '';
                var songDetailList = [];
                for (let i = 0; i < list.length; i++) {
                    //console.log(list[i].id);
                    songsIds += list[i].id +',';
                }
                songsIds = songsIds.substring(0,songsIds.length-1);
                v.$axios.get('api/song/detail', {
                    params: {
                        ids: songsIds
                    }
                }).then(response => {
                    if (response.data.code === 200) {
                        songDetailList = response.data.songs;
                    }
                    v.loadSongUrl(songDetailList,songsIds);
                }).catch(error => {
                    console.log(error);
                });
            },
            /**
             * 传入歌曲id，获取歌曲播放地址
             * @param list
             */
            loadSongUrl(songDetailList,songsIds) {
                var v = this;
                let songUrlList = [];
                //console.log(songsIds);
                v.$axios.get('api/song/url', {
                    params: {
                        id: songsIds
                    }
                }).then(response => {
                    //console.log(response.data.data);
                    if (response.data.code === 200) {
                        songUrlList = response.data.data;
                        // console.log(songUrlList);
                        v.manageSongList(songDetailList,songUrlList);
                        //console.log(v.songList);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            /**
             * 根据歌曲详情列表和歌曲播放地址列表整合每首歌的信息
             * @param list1
             * @param list2
             */
            manageSongList(list1,list2){
                var v = this;
                v.filterSinger(list1);
                // console.log("歌曲详情：");
                // console.log(list1);
                // console.log("播放地址详情：");
                //console.log(list2);
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
                    for (let m = 0;m< list2.length;m++){
                        if (list1[i].id === list2[m].id) {
                            song.songURL = list2[m].url;
                            break;
                        }
                    }
                    // console.log(song);
                    v.songList.push(song);
                }
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
            // _normalizeSongs(list) {
            //     let ret = [];
            //     list.forEach((musicData) => {
            //         if (isValidMusic(musicData)) {
            //             ret.push(createSong(musicData))
            //         }
            //     });
            //     return ret
            // }
        },
        components: {
            MusicList
        }
    }
</script>

<style scoped>
    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }

</style>