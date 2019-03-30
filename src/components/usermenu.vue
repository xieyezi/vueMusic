<template>
    <transition name="slide">
        <div class="uermenu" :class="themeNumber">
            <div class="back" @click="back">
                <i class="icon-back"></i>
            </div>
            <div class="menu-warpper">
                <div class="tophead" >
                    <!--<p>今天也要开心哦～</p>-->
                </div>
                <div class="content">
                    <div class="content-warpper">
                        <Row :gutter="4" type="flex" justify="space-between" class="code-row-bg">
                            <Col span="12" style="margin-bottom: 30px;">
                                <Card style="height: 150px;">
                                    <div style="text-align:center">
                                        <span :class="themeNum"><Icon type="ios-log-in" /></span>
                                        <p>登录</p>
                                    </div>
                                </Card>
                            </Col>
                            <Col span="12">
                                <Card style="height: 150px;">
                                    <div style="text-align:center">
                                        <span :class="themeNum"><Icon type="ios-person-outline" /></span>
                                        <p>注册</p>
                                    </div>
                                </Card>
                            </Col>
                            <Col span="12">
                                <Card style="height: 150px;">
                                    <div style="text-align:center" @click="toChangeTheme">
                                        <span :class="themeNum"><Icon type="ios-shirt-outline" /></span>
                                        <p>更换皮肤</p>
                                    </div>
                                </Card>
                            </Col>
                            <Col span="12">
                                <Card style="height: 150px;">
                                    <div style="text-align:center" @click="toAboutMe">
                                        <span :class="themeNum"><Icon type="ios-information-circle-outline" /></span>
                                        <p>关于</p>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "usermenu",
        computed: {
            themeNumber() {
                return this.theme === 0 ? 'theme1' : this.theme === 1 ? 'theme2' : 'theme3'
            },
            themeNum(){
                return this.theme === 0 ? 'theme1-1' : this.theme === 1 ? 'theme2-1' : 'theme3-1'
            },
            ...mapGetters([
                'theme',
            ])
        },
        methods:{
            back(){
                this.$router.back();
            },
            toChangeTheme(){
                this.$router.push({
                    path: '/theme'
                });
            },
            toAboutMe(){
                this.$router.push({
                    path: '/about'
                });
            }
        }
    }
</script>

<style scoped>
    @import '../common/css/icon.css';
    .uermenu {
        position: fixed;
        z-index: 100;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        /*background: rgb(214,162,232);*/
    }
    .theme1{
        background: #ff7675;
    }
    .theme2{
        background: #87cbd8;
    }
    .theme3{
        background: #D6A2E8;
    }
    .theme1-1{
        font-size: 40px;
        color: #ff7675;
    }
    .theme2-1{
        font-size: 40px;
        color: #87cbd8;
    }
    .theme3-1{
        font-size: 40px;
        color: #D6A2E8;
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
    .menu-warpper{
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
    .tophead{
        position: relative;
        height: 8%;
        text-align: center;
        font-weight: 400;
        font-size: 16px;
        color:rgb(255,255,255);
    }
    .content{
        position: relative;
        /*height: 100%;*/
        background: rgba(255,255,255,0.9);
        /*border-top-left-radius: 50px;*/
        /*border-top-right-radius: 50px;*/
        border-radius: 30px;
    }
    .content-warpper{
        /*border:solid 1px red;*/
        padding-top: 30%;
        padding-bottom: 30%;
        vertical-align: middle;
        text-align: center;
    }
    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }
</style>