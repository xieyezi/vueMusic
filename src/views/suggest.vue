<template>
    <div class="suggest">
        <ul class="suggest-list">
            <li class="suggest-item" v-for="item in result">
                <div class="icon">
                    <i class="icon-search1"></i>
                </div>
                <div class="name">
                    <p class="text">{{item.name}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "suggest",
        props: {
            query: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                result: []
            }
        },
        methods: {
            search(keywords) {
                var v = this;
                let songs = [];
                let artists = [];
                v.$axios.get('api/search/suggest', {
                    params: {
                        keywords: keywords,
                        // type: 'mobile'
                    }
                }).then(response => {
                    //console.log(response);
                    if (response.data.code === 200) {
                        artists = response.data.result.artists;
                        songs = response.data.result.songs;
                        if (artists) {
                            for (let i = 0; i < artists.length; i++) {
                                // console.log(artists[i].name);
                                v.result.push(artists[i]);
                            }
                        }
                        for (let z = 0; z < songs.length; z++) {
                            // console.log(songs[z].name);
                            v.result.push(songs[z]);
                        }
                        // console.log(v.result.length);
                        //console.log(v.result);
                    }
                })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        watch: {
            query() {
                this.result = [];
                if (this.query){
                    this.search(this.query);
                }
            }
        }
    }
</script>

<style scoped>
    @import '../common/css/icon.css';

    .suggest {
        margin-top: 20px;
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

    .icon-search1 {
        font-size: 17px;
    }

    .suggest-item .name {
        flex: 1;
        font-size: 14px;
        /*color: $color-text-d*/
        overflow: hidden;
    }

    .suggest-item .name .text {
        white-space: nowrap;
    }

    .no-result-wrapper {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }

</style>