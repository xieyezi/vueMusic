<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content">
            <div>
                <div v-if="bannerList.length" class="slider-wrapper">
                    <div class="slider-content">
                        <slider ref="slider" class="slide">
                            <div v-for="item in bannerList" @click="toPlay(item.encodeId)">
                                <img :src="item.imageUrl">
                            </div>
                            <!--<div class="type"></div>-->
                        </slider>
                    </div>
                </div>


                <div class="recommend-list">
                    <h1 class="list-title" v-show="recommendList.length>0">热门歌单推荐</h1>
                    <ul class="list-content">
                        <Row :gutter="4" type="flex" justify="space-between" class="code-row-bg">
                            <Col span="8" v-for="item in recommendList" style="margin-bottom: 10px;">
                                <li class="item" @click="openRecommendList(item.id)">
                                    <div class="icon">
                                        <img @load="loadImage" width="100%" height="100%" v-lazy="item.picUrl">
                                    </div>
                                    <div class="text">
                                        <p class="name" v-html="item.name"></p>
                                    </div>
                                </li>
                            </Col>
                        </Row>

                    </ul>
                </div>

                <div class="recommend-list">
                    <h1 class="list-title" v-show="newSongList.length>0">最新音乐大碟</h1>
                    <ul class="list-content">
                        <Row :gutter="4" type="flex" justify="space-between" class="code-row-bg">
                            <Col span="8" v-if="index < 6" v-for="(item,index) in newSongList"
                                 style="margin-bottom: 10px;">
                                <li class="item">
                                    <div class="icon">
                                        <img @load="loadImage" width="100%" height="100%"
                                             v-lazy="item.song.album.blurPicUrl">
                                    </div>
                                    <div class="text">
                                        <p class="name" v-html="item.name"></p>
                                    </div>
                                </li>
                            </Col>
                        </Row>

                    </ul>
                </div>

                <div class="recommend-list">
                    <h1 class="list-title" v-show="radioList.length>0">最热电台</h1>
                    <ul class="list-content">
                        <li class="Songitem" v-for="item in radioList">
                            <div class="infoImg">
                                <img @load="loadImage" v-lazy="item.picUrl" class="imgInfo"/>
                            </div>
                            <div class="info">
                                <h2 class="name">{{item.name}}</h2>
                                <p class="desc">{{item.copywriter}}</p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="loading-container" v-show="!recommendList.length&&!newSongList.length&&!radioList.length">
                <loading></loading>
            </div>
        </scroll>

    </div>
</template>

<script>
    import Slider from 'components/slider'
    import Scroll from 'components/scroll'
    import Loading from 'components/loading'
    export default {
        name: "recommend",
        data() {
            return {
                bannerList: [],
                recommendList: [],
                radioList: [],
                newSongList: [],
                // Spinshow:truess
            }
        },
        methods: {
            loadBanner() {
                var v = this;
                v.$axios.get('api/banner')
                    .then(response => {
                        //console.log(response.data.banners);
                        if (response.data.code === 200) {
                            v.bannerList = response.data.banners;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadRecommend() {
                var v = this;
                v.$axios.get('api/personalized?limit=6')
                    .then(response => {
                        //console.log(response.data.result);
                        if (response.data.code === 200) {
                            v.recommendList = response.data.result;

                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadRadio() {
                var v = this;
                v.$axios.get('api/personalized/djprogram')
                    .then(response => {
                        //console.log(response.data.result);
                        if (response.data.code === 200) {
                            v.radioList = response.data.result;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadNewsong() {
                var v = this;
                v.$axios.get('api/personalized/newsong?limit=10')
                    .then(response => {
                        //console.log(response.data.result);
                        if (response.data.code === 200) {
                            v.newSongList = response.data.result;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            loadImage() {
                if (!this.checkloaded) {
                    this.checkloaded = true
                    setTimeout(() => {
                        this.$refs.scroll.refresh();
                    }, 20)
                }
            },
            toPlay(value) {
                //console.log(value);
            },
            openRecommendList(value) {
                //console.log(value);
            }
        },
        components: {
            Slider,
            Scroll,
            Loading
        },
        created() {
            this.loadBanner();
            this.loadRecommend();
            this.loadNewsong();
            this.loadRadio();
        }
    }
</script>

<style scoped>
    .recommend {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
    }

    .recommend-content {
        height: 100%;
        overflow: hidden;
    }

    .slider-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 40%;
        overflow: hidden;
    }

    .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .recommend-list {
    }

    .list-title {
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 16px;
        color: rgba(102, 153, 204, 0.8);
    }

    .list-content {
        padding: 0 2px 0px 2px;
    }

    .list-content li {
        list-style: none;
    }

    .list-content .item .icon img {
        border-radius: 2px;
    }

    .Songitem {
        display: flex;
        height: 130px;
        border-bottom: solid #e6e6e6 1px;
    }

    .Songitem .infoImg {
        position: relative;
        flex: 1;
        margin-top: 5px;
        float: left;
        margin-left: 5px;
    }

    .Songitem .imgInfo {
        width: 120px;
        height: 120px;
        border-radius: 2px;
    }

    .Songitem .info {
        position: relative;
        top: 30%;
        flex: 2;
        margin-left: 5px;
    }

    .Songitem .info .name {
        font-size: 13px;
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 3px;
    }

    .Songitem .info .desc {
        font-size: 10px;
    }

</style>