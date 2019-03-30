<template>
    <div class="about">
        <div class="top" :class="themeNumber">
            <div class="back" @click="back">
                <i class="icon-back"></i>
            </div>
            <h2 class="subtitle">关于时刻音乐</h2>
        </div>
        <div class="middle">
            <div class="icon">
                <img :src="imgURL">
            </div>
        </div>
        <div class="bottom">
            <div class="item">
                <span class="text">当前版本</span>
                <span class="icon"><p>1.0.0</p></span>
            </div>
            <div class="item">
                <span class="text">新版更新</span>
                <span class="icon"><p>无新版</p></span>
            </div>
            <div class="item">
                <span class="text">作者</span>
                <span class="icon"><p>写夜子</p></span>
            </div>
            <div class="item">
                <span class="text">帮助与反馈</span>
                <a class="icon" href="Mailto:1435398529@qq.com">
                    <span>
                        <Icon size="20" color="#999" type="ios-arrow-forward" />
                    </span>
                </a>
            </div>
        </div>
        <div class="copyright">
            <p>© 2018- 2019 Xieyezi</p>
            <p>Copyright Xieyezi.All Rights Reserved.</p>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "about",
        data(){
            return{
                imgList:[
                    'http://pohm05hj4.bkt.clouddn.com/logo1.png',
                    'http://pohm05hj4.bkt.clouddn.com/logo2.png',
                    'http://pohm05hj4.bkt.clouddn.com/logo3.png'
                ]

            }
        },
        methods:{
            back(){
                this.$router.back();
            }
        },
        computed: {
            themeNumber() {
                return this.theme === 0 ? 'theme1' : this.theme === 1 ? 'theme2' : 'theme3'
            },
            imgURL(){
                return this.theme === 0 ? this.imgList[0] : this.theme === 1 ? this.imgList[1] : this.imgList[2]
            },
            ...mapGetters([
                'theme',
            ])
        },
    }
</script>

<style scoped>
    @import '../common/css/icon.css';
    .about{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
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
        font-size: 20px;
        /*//color: rgb(102, 153, 204);*/
    }
    .top{
        position: relative;
        margin-bottom: 25px;
        height: 48px;
        background: rgba(255,118,117,1);
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
    .top .subtitle{
        padding-top: 10px;
        line-height: 20px;
        text-align: center;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
    }
    .middle{
        padding:80px 0 80px 0;
        width: 100%;
        border-bottom: 1px solid #eee;
    }
    .middle .icon{
        text-align: center;
        width: 100%;
        height: 100%;
    }
    .middle .icon img{
        width: 50%;
        height: auto;
    }
    .bottom{
        /*margin: 0 20px;*/
    }
    .bottom .item{
        padding: 0 20px;
        display: flex;
        align-items: center;
        height: 40px;
        overflow: hidden;
        border-bottom: 1px solid #eee;
        color: #666;
        font-size: 14px;
    }
    .bottom .item .text{
        flex: 1;
    }
    .copyright{
        position: fixed;
        width: 100%;
        bottom: 10px;
        text-align: center;
        font-size: 12px;
        color: #aaa;
    }
</style>