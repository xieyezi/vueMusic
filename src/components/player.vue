<template>
    <div class="player" v-show="playList.length>0">
        <transition name="normal"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @leave="leave"
                    @after-leave="afterLeave"
        >
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img :src="currentSong.al.picUrl" width="100%" height="100%"/>
                </div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.ar"></h2>
                </div>
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper">
                            <div class="cd">
                                <img :src="currentSong.al.picUrl" class="image"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon i-left">
                            <i class="icon-prev"></i>
                        </div>
                        <div class="icon i-center">
                            <i class="icon-play"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon-next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen" @click="open">
                <div class="icon">
                    <img :src="currentSong.al.picUrl" width="40" height="40"/>
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.ar"></p>
                </div>
                <div class="control">
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import animations from 'create-keyframe-animation'

    export default {
        name: "player",
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'fullScreen',
                'playList',
                'currentSong'
            ])
        },
        methods: {
            back() {
                this.setFullScreen(false);
            },
            open() {
                this.setFullScreen(true);
            },
            enter(el,done){

            },
            afterEnter(){

            },
            leave(el,done){

            },
            afterLeave(){

            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN'
            })
        }
    }
</script>

<style scoped>
    @import '../common/css/icon.css';

    .player {

    }

    .normal-player {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        background: gray;
    }

    .normal-player .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);
    }

    .normal-player .top {
        position: relative;
        margin-bottom: 25px;
    }

    .normal-player .top .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
    }

    .normal-player .top .back .icon-back {
        display: block;
        padding: 9px;
        font-size: 22px;
        /*color: $color-theme*/
        transform: rotate(-90deg);
    }

    .normal-player .top .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .normal-player .top .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: #fff;
    }

    .normal-player .middle {
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
    }

    .normal-player .middle .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
    }

    .normal-player .middle .middle-l .cd-wrapper {
        position: absolute;
        left: 10%;
        top: 0;
        width: 80%;
        box-sizing: border-box;
        height: 100%;
    }

    .cd-wrapper .cd {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .cd-wrapper .image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 50%;
        border: 10px solid rgba(255, 255, 255, 0.1);
    }

    .cd-wrapper .play {
        animation: rotate 20s linear infinite;
    }

    .playing-lyric-wrapper {
        width: 80%;
        margin: 30px auto 0 auto;
        overflow: hidden;
        text-align: center;
    }

    .playing-lyric-wrapper .playing-lyric {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
    }

    .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .middle-r .lyric-wrapper {
        width: 80%;
        margin: 0 auto;
        overflow: hidden;
        text-align: center;
    }

    .middle-r .lyric-wrapper .text {
        line-height: 32px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
    }

    .middle-r .lyric-wrapper .current {
        color: #fff;
    }

    .middle-r .lyric-wrapper .pure-music {
        padding-top: 50%;
        line-height: 32px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
    }

    .bottom {
        position: absolute;
        bottom: 50px;
        width: 100%;
    }

    .bottom .dot-wrapper {
        display: inline-block;
        vertical-align: middle;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
    }

    .bottom .active {
        width: 20px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.8);
    }

    .bottom .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
    }

    .bottom .progress-wrapper .time {
        color: #fff;
        font-size: 12px;
        flex: 0 0 30px;
        line-height: 30px;
        width: 30px;
    }

    .bottom .progress-wrapper .time-l {
        text-align: left
    }

    .bottom .progress-wrapper .time-r {
        text-align: right
    }

    .bottom .progress-wrapper .progress-bar-wrapper {
        flex: 1;
    }

    .bottom .operators {
        display: flex;
        align-items: center;
    }

    .bottom .operators .icon {
        flex: 1;
        /*color: $color-theme;*/
    }

    .bottom .operators .disable {
        /*color: $color-theme-d*/
    }

    .bottom .operators .icon i {
        font-size: 30px;
    }

    .bottom .operators .i-left {
        text-align: right;
    }

    .bottom .operators .i-center {
        padding: 0 20px;
        text-align: center;
    }

    .bottom .operators .i-center i {
        font-size: 40px;
    }

    .bottom .operators .i-right {
        text-align: left;
    }

    .bottom .operators .icon-favorite {
        /*color: $color-sub-theme*/
    }

    .normal-enter-active, .normal-leave-active {
        transition: all 0.4s;
    }

    .normal-enter-active, .normal-leave-active .top {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }

    .normal-enter-active, .normal-leave-active .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }

    .normal-enter, .normal-leave-to {
        opacity: 0;
    }

    .normal-enter, .normal-leave-to .top {
        transform: translate3d(0, -100px, 0);
    }

    .normal-enter, .normal-leave-to .bottom {
        transform: translate3d(0, 100px, 0);
    }

    .mini-player {
        display: flex;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 180;
        width: 100%;
        height: 60px;
        background: #333;
    }

    .mini-enter-active, .mini-leave-active {
        transition: all 0.4s;
    }

    .mini-enter, .mini-leave-to {
        opacity: 0;
    }

    .mini-player .icon {
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        padding: 0 10px 0 20px;
    }

    .mini-player .icon .imgWrapper {
        height: 100%;
        width: 100%;
    }

    .mini-player .icon img {
        border-radius: 50%;
    }

    .mini-player .icon .imgWrapper img {
        border-radius: 50%;
    }

    .mini-player .icon .imgWrapper .play {
        animation: rotate 10s linear infinite;
    }

    .mini-player .icon .imgWrapper .pause {
        animation-play-state: paused;
    }

    .mini-player .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        margin-left: 30px;
        line-height: 20px;
        overflow: hidden;
    }

    .mini-player .text .name {
        margin-bottom: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        color: #fff
    }

    .mini-player .text .desc {
        font-size: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: rgba(255, 255, 255, 0.3);
    }

    .mini-player .control {
        flex: 0 0 50px;
        width: 30px;
        padding: 0 10px;
    }

    .mini-player .control .icon-play-mini, .icon-pause-mini, .icon-playlist {
        font-size: 30px;
        /*color: $color-theme-d*/
    }

    .mini-player .control .icon-mini {
        font-size: 32px;
        position: absolute;
        left: 0;
        top: 0;
    }

    /*@keyframes rotate{*/
    /*0%*/
    /*}*/
</style>