<template>
    <transition name="slide">
        <div class="theme theme1">
            <div class="back" @click="back">
                <i class="icon-back"></i>
            </div>
            <div class="choose" @click="changeTheme">
                <p class="choosetext">确定</p>
            </div>
            <div class="tophead theme1" ref="tophead">
            </div>
            <div class="content" ref="theme">
                <div class="preview">
                    <div class="imgwrapper">
                        <img :src="imgurl">
                    </div>

                </div>
                <div class="themeitme">
                    <Row :gutter="4" type="flex" justify="space-between" class="code-row-bg">
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
    import {mapMutations} from 'vuex'

    export default {
        mixins: [playlistMixin],
        name: "theme",
        data() {
            return {
                imgurl: 'http://tu.027cgb.com/618013/yulan1.png',
                theme:0 //默认为桃花粉主题
            }
        },
        computed: {},
        methods: {
            handlePlayList(playList) {
                const bottom = playList.length > 0 ? '30px' : '';
                this.$refs.theme.style.bottom = bottom;
            },
            back() {
                this.$refs.theme1.style.border = '0';
                this.$refs.theme2.style.border = '0';
                this.$refs.theme3.style.border = '0';
                this.imgurl = 'http://tu.027cgb.com/618013/yulan1.png';
                this.$router.back();
            },
            changeTheme() {
                console.log(this.theme);
                this.setTheme(this.theme);
                //  todo 已经将theme编号设置到vueX中，接下来只需在各个组件取出来判断即可
            },
            chooseItem1() {
                this.imgurl = 'http://tu.027cgb.com/618013/yulan1.png';
                this.$refs.theme1.style.border = 'solid 1px gray';
                this.$refs.theme2.style.border = '0';
                this.$refs.theme3.style.border = '0';
                this.theme = 0;
            },
            chooseItem2() {
                this.imgurl = 'http://tu.027cgb.com/618013/yulan2.png';
                this.$refs.theme2.style.border = 'solid 1px gray';
                this.$refs.theme1.style.border = '0';
                this.$refs.theme3.style.border = '0';
                this.theme = 1;
            },
            chooseItem3() {
                this.imgurl = 'http://tu.027cgb.com/618013/yulan3.png';
                this.$refs.theme3.style.border = 'solid 1px gray';
                this.$refs.theme2.style.border = '0';
                this.$refs.theme1.style.border = '0';
                this.theme = 2;
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
        /*background: rgba(214,162,232);*/
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
        font-size: 15px;
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
        padding-top: 5px;
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