<template>
    <div class="recommend" ref="recommend">
        <scroll ref="scroll" class="recommend-content">
            <div>
                <div v-if="bannerList.length" class="slider-wrapper">
                    <div class="slider-content">
                        <slider ref="slider" class="slide">
                            <div v-for="item in bannerList">
                                <a href="#">
                                    <img :src="item.imageUrl">
                                </a>
                            </div>
                            <!--<div class="type"></div>-->
                        </slider>
                    </div>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul class="list-content">
                        <Row :gutter="4">
                            <Col span="8" v-for="item in recommendList" style="margin-bottom: 10px;">
                                <li class="item">
                                    <div class="icon">
                                        <img width="120" height="120" v-lazy="item.picUrl">
                                    </div>
                                    <div class="text">
                                        <p class="name" v-html="item.name"></p>
                                        <!--<p class="desc" v-html="item.copywriter"></p>-->
                                    </div>
                                </li>
                            </Col>
                        </Row>

                    </ul>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
    import Slider from 'components/slider'
    import Scroll from 'components/scroll'
    export default {
        name: "recommend",
        data() {
            return {
                bannerList: [],
                recommendList: []
            }
        },
        methods: {
            loadBanner() {
                var v = this;
                v.$axios.get('api/banner')
                    .then(response => {
                        console.log(response.data.banners);
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
                v.$axios.get('api/personalized')
                    .then(response => {
                        //console.log(response.data);
                        if (response.data.code === 200) {
                            v.recommendList = response.data.result;
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
                        this.$refs.scroll.refresh()
                    }, 20)
                }
            }
        },
        components: {
            Slider,
            Scroll
        },
        created() {
            this.loadBanner();
            this.loadRecommend();
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
    .recommend-content{
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
    /*.slider-content .type{*/
        /*position: fixed;*/
        /*top: 50px;*/
        /*right: 2px;*/
        /*width: 60px;*/
        /*z-index: 999;*/
        /*height: 30px;*/
        /*background: red;*/
        /*border-radius: 20px;*/
    /*}*/
    .recommend-list{
    }
    .list-title{
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 16px;
        color: rgba(102,153,204,0.8);
    }
    .list-content li{
        list-style: none;
    }
    .list-content .item .icon img{
        border-radius: 2px;
    }
</style>