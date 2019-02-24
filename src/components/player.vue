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
                    <img :src="currentSong.imgURL" width="100%" height="100%"/>
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
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd" :class="cdCls">
                                <img :src="currentSong.imgURL" class="image"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom">

                    <div class="progress-wrapper">
                        <span class="time time-l">{{format(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <ProgressBar :percent="percent" @percentChange="onProgressBarChange"></ProgressBar>
                        </div>
                        <span class="time time-r">{{formatTotalTime(currentSong.time)}}</span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon i-left" :class="disableCls">
                            <i class="icon-prev" @click="prev"></i>
                        </div>
                        <div class="icon i-center" :class="disableCls">
                            <i @click="togglePlaying" :class="playIcon"></i>
                        </div>
                        <div class="icon i-right" :class="disableCls">
                            <i class="icon-next" @click="next"></i>
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
                    <img :class="cdCls" :src="currentSong.imgURL" width="40" height="40"/>
                </div>
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.ar"></p>
                </div>
                <div class="control">
                    <i :class="miniIcon" @click.stop="togglePlaying"></i>
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <audio :src="currentSong.songURL" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import animations from 'create-keyframe-animation'
    import ProgressBar from './progress-bar'

    export default {
        name: "player",
        data() {
            return {
                songReady: false,
                currentTime: 0
            }
        },
        computed: {
            playIcon() {
                return this.playing ? 'icon-play' : 'icon-pause'
            },
            miniIcon() {
                return this.playing ? 'icon-play-mini' : 'icon-pause-mini'
            },
            cdCls() {
                return this.playing ? 'play' : ' play pause'
            },
            disableCls() {
                return this.songReady ? '' : 'disable'
            },
            percent() {
                //console.log((this.currentTime*1000) / this.currentSong.dt);
                return (this.currentTime * 1000) / this.currentSong.time;
            },
            ...mapGetters([
                'fullScreen',
                'playList',
                'currentSong',
                'playing',
                'currentIndex'
            ])
        },
        methods: {
            back() {
                this.setFullScreen(false);
            },
            open() {
                this.setFullScreen(true);
            },
            enter(el, done) {
                const {x, y, scale} = this._getPosAndScale();

                let animation = {
                    0: {
                        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
                    },
                    60: {
                        transform: `translate3d(0,0,0) scale(1.1)`
                    },
                    100: {
                        transform: `translate3d(0,0,0) scale(1)`
                    }
                };

                animations.registerAnimation({
                    name: 'move',
                    animation,
                    presets: {
                        duration: 400,
                        easing: 'linear'
                    }
                });
                animations.runAnimation(this.$refs.cdWrapper, 'move', done);
            },
            afterEnter() {
                animations.unregisterAnimation('move');
                this.$refs.cdWrapper.style.animation = '';
            },
            leave(el, done) {
                this.$refs.cdWrapper.style.transition = 'all 0.4s';
                const {x, y, scale} = this._getPosAndScale();
                this.$refs.cdWrapper.style['transform'] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
                const timer = setTimeout(done, 400);
                this.$refs.cdWrapper.addEventListener('transitionend', () => {
                    clearTimeout(timer);
                    done()
                })
            },
            afterLeave() {
                this.$refs.cdWrapper.style.transition = '';
                this.$refs.cdWrapper.style['transform'] = '';
            },
            _getPosAndScale() {
                const targetWidth = 40;
                const paddingLeft = 40;
                const paddingBottom = 30;
                const paddingTop = 80;
                const width = window.innerWidth * 0.8;
                const scale = targetWidth / width;
                const x = -(window.innerWidth / 2 - paddingLeft);
                const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
                return {
                    x,
                    y,
                    scale
                }
            },
            togglePlaying() {
                if (!this.songReady) {
                    return;
                }
                this.setPlayingState(!this.playing);
            },
            updateTime(e) {
                this.currentTime = e.target.currentTime;
            },
            pad(num, n = 2) {
                let len = num.toString().length;
                while (len < n) {
                    num = '0' + num;
                    len++;
                }
                return num;
            },
            //调整时间戳(|0为向下取整)
            format(interval) {
                interval = interval | 0;
                const minute = interval / 60 | 0;
                const second = this.pad(interval % 60);
                return `${minute}:${second}`;
            },
            /*
              @interval
              根据interval计算出歌曲分秒
             */
            formatTotalTime(interval) {
                const minute = (interval % (1000 * 60 * 60)) / (1000 * 60) | 0;
                let secondChange = ((interval % (1000 * 60)) / 1000) | 0;
                //如果秒小于10,就在前面加上0
                if (secondChange < 10) {
                    secondChange = '0'+ secondChange;
                }
                const second = secondChange;
                // console.log("分钟数："+minute);
                // console.log("秒数："+ second);
                return `${minute}:${second}`;
            },
            prev() {
                if (!this.songReady) {
                    return;
                }
                let index = this.currentIndex - 1;
                if (index === -1) {
                    //到第一首就切换到最后一首
                    index = this.playList.length - 1;
                }
                this.setCurrentIndex(index);
                //在暂停状态下切歌把图标状态也切换
                if (!this.playing) {
                    this.togglePlaying();
                }
                this.songReady = false;
            },
            next() {
                if (!this.songReady) {
                    return;
                }
                let index = this.currentIndex + 1;
                if (index === this.playList.length) {
                    //到最后一首就切到第一首
                    index = 0;
                }
                this.setCurrentIndex(index);
                if (!this.playing) {
                    this.togglePlaying();
                }
                this.songReady = false;
            },
            ready() {
                this.songReady = true;
            },
            error() {
                this.songReady = true;
            },
            onProgressBarChange(percent) {
                // console.log("totaltime:"+this.currentSong.dt);
                // console.log("currenttime:"+this.currentSong.dt * percent);
                const currentTime = (this.currentSong.time * percent) / 1000;
                this.$refs.audio.currentTime = currentTime;
                if (!this.playing) {
                    this.togglePlaying();
                }
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN',
                setPlayingState: 'SET_PLAYING_STATE',
                setCurrentIndex: 'SET_CURRENT_INDEX'
            })
        },
        watch: {
            currentSong() {
                var v = this;
                v.$nextTick(() => {
                    v.$refs.audio.play();
                });
            },
            playing(newPlaying) {
                var v = this;
                const audio = v.$refs.audio;
                v.$nextTick(() => {
                    newPlaying ? audio.play() : audio.pause();
                });
            }
        },
        components: {
            ProgressBar
        },
        created() {

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
        background: #2d3047;
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

    .cd-wrapper .play {
        animation: rotate 20s linear infinite;
    }

    .cd-wrapper .pause {
        animation-play-state: paused;
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
        background: rgb(135, 203, 216);
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

    .mini-player .icon .play {
        animation: rotate 20s linear infinite;

    }

    .mini-player .icon .pause {
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
        color: #fff;
    }

    .mini-player .text .desc {
        font-size: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #fff;
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

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>