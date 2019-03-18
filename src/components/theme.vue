<template>
    <transition name="slide">
        <div class="theme" :class="themeNumber">
            <div class="back" @click="back">
                <i class="icon-back"></i>
            </div>
            <div class="choose" @click="changeTheme">
                <p class="choosetext">确定</p>
            </div>
            <div class="tophead" :class="themeNumber" ref="tophead">
            </div>
            <div class="content" ref="theme">
                <div class="preview">
                    <div class="imgwrapper">
                        <img :src="imgurl">
                    </div>

                </div>
                <div class="themeitme">
                    <Row :gutter="16" type="flex" justify="space-between" class="code-row-bg">
                        <Col span="8">
                            <div ref="theme1">
                                <Card style="height: 50px;background: #ff7675;">
                                    <div style="text-align:center" @click="chooseItem1()">
                                        <p class="title">桃花粉</p>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        <Col span="8">
                            <div ref="theme2">
                                <Card style="height: 50px;background: #87cbd8;">
                                    <div style="text-align:center" @click="chooseItem2">
                                        <p class="title">绿松青</p>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        <Col span="8">
                            <div ref="theme3">
                                <Card style="height: 50px;background: #d6a2e8;">
                                    <div style="text-align:center" @click="chooseItem3">
                                        <p class="title">丁香紫</p>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {playlistMixin} from '../common/js/mixin'
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        mixins: [playlistMixin],
        name: "theme",
        data() {
            return {
                imgurl: 'http://pohm05hj4.bkt.clouddn.com/yulan1.png',
                themeId: 0 //默认为桃花粉主题
            }
        },
        computed: {
            themeNumber() {
                return this.theme === 0 ? 'theme1' : this.theme === 1 ? 'theme2' : 'theme3'
            },
            ...mapGetters([
                'theme',
            ])
        },
        methods: {
            handlePlayList(playList) {
                const bottom = playList.length > 0 ? '20px' : '';
                this.$refs.theme.style.bottom = bottom;
            },
            back() {
                this.$refs.theme1.style.border = '0';
                this.$refs.theme2.style.border = '0';
                this.$refs.theme3.style.border = '0';
                this.imgurl = 'http://pohm05hj4.bkt.clouddn.com/yulan1.png';
                this.$router.back();
            },
            changeTheme() {
                this.setTheme(this.themeId);
                this.$router.back();
            },
            chooseItem1() {
                this.imgurl = 'http://pohm05hj4.bkt.clouddn.com/yulan1.png';
                this.$refs.theme1.style.border = 'solid 1px gray';
                this.$refs.theme2.style.border = '0';
                this.$refs.theme3.style.border = '0';
                this.themeId = 0;
            },
            chooseItem2() {
                this.imgurl = 'http://pohm05hj4.bkt.clouddn.com/yulan2.png';
                this.$refs.theme2.style.border = 'solid 1px gray';
                this.$refs.theme1.style.border = '0';
                this.$refs.theme3.style.border = '0';
                this.themeId = 1;
            },
            chooseItem3() {
                this.imgurl = 'http://pohm05hj4.bkt.clouddn.com/yulan3.png';
                this.$refs.theme3.style.border = 'solid 1px gray';
                this.$refs.theme2.style.border = '0';
                this.$refs.theme1.style.border = '0';
                this.themeId = 2;
            },
            ...mapMutations({
                setTheme: 'SET_THEME',
            })
        }
    }
</script>

<style scoped>
    @import '../common/css/icon.css';

    .theme {
        position: fixed;
        z-index: 100;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
    .theme1 {
        background: #ff7675;
    }

    .theme2 {
        background: #87cbd8;
    }

    .theme3 {
        background: #D6A2E8;
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
        font-size: 20px;
        /*//color: rgb(102, 153, 204);*/
    }

    .choose {
        position: absolute;
        top: 0;
        right: 6px;
        z-index: 50;
    }

    .choosetext {
        display: block;
        padding: 10px;
        font-size: 14px;
        color: white;
    }

    .tophead {
        position: relative;
        height: 10%;
    }

    .content {
        position: relative;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
    }

    .preview {
        width: 70%;
        margin: 0 auto;
        padding: 5px 0px 5px 0px;
        /*background: #d81e06;*/
    }

    .preview .imgwrapper {
        margin: 0 auto;
    }

    .preview img {
        width: auto;
        height: auto;
        width: 100%;
        height: 100%;
    }

    .themeitme {
        width: 70%;
        margin: 0 auto;
    }

    .content .title {
        color: white;
        font-size: 12px;
    }

    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }

</style>