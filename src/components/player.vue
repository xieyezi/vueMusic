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
                        <i class="icon-close"></i>
                    </div>
                    <h1 class="title" v-html="currentSong.name"></h1>
                    <h2 class="subtitle" v-html="currentSong.ar"></h2>
                </div>
                <div class="middle"
                     @touchstart.prevent="middleTouchStart"
                     @touchmove.prevent="middleTouchMove"
                     @touchend="middleTouchEnd"
                >
                    <div class="middle-l" ref="middleL">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd" :class="cdCls">
                                <img :src="currentSong.imgURL" class="image"/>
                            </div>
                        </div>
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric">{{playingLyric}}</div>
                        </div>
                    </div>
                    <Scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
                        <div class="lyric-wrapper">
                            <div v-if="currentLyric">
                                <p ref="lyricLine"
                                   class="text"
                                   :class="{'current':currentLineNum === index}"
                                   v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
                            </div>
                        </div>
                    </Scroll>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <span class="dot" :class="{'active':currentShow === 'cd'}"></span>
                        <span class="dot" :class="{'active':currentShow === 'lyric'}"></span>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time time-l">{{format(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <ProgressBar :percent="percent" @percentChange="onProgressBarChange"></ProgressBar>
                        </div>
                        <span class="time time-r">{{formatTotalTime(currentSong.time)}}</span>
                    </div>
                    <div class="operators">
                        <div class="icon i-left" @click="changeMode">
                            <i :class="iconMode"></i>
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
                            <i class="icon" @click="toggleFavorite(currentSong)"
                               :class="getFavoriteIcon(currentSong)"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="mini-player" ref="mini-player" :class="themeNumber" v-show="!fullScreen" @click="open">
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
                <div class="control" @click.stop="showPlayList">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <play-list ref="playlist"></play-list>
        <audio :src="currentSong.songURL" ref="audio" @playing="ready"
               @ended="end"
               @pause="paused"
               @error="error" @timeupdate="updateTime"></audio>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import animations from 'create-keyframe-animation'
    import ProgressBar from './progress-bar'
    import {playMode} from '../common/js/config'
    import {shuffle} from '../common/js/util'
    import Scroll from '../components/scroll'
    import PlayList from '../components/playlist'
    import Lyric from 'xieyezi-lyric'
    import {prefixStyle} from "../common/js/dom";
    import {playerMixin} from '../common/js/mixin'

    const transitionDuration = prefixStyle('transitionDuration');
    const transform = prefixStyle('transform');
    export default {
        name: "player",
        mixins: [playerMixin],
        data() {
            return {
                songReady: false,
                currentTime: 0,
                currentLyric: null,
                currentLineNum: 0,
                currentShow: 'cd',
                playingLyric:''
            }
        },
        computed: {
            playIcon() {
                return this.playing ? 'icon-play' : 'icon-pause'
            },
            miniIcon() {
                return this.playing ? 'icon-play-mini' : 'icon-pause-mini'
            },
            iconMode() {
                return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
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
            themeNumber() {
                return this.theme === 0 ? 'theme1' : this.theme === 1 ? 'theme2' : 'theme3'
            },
            ...mapGetters([
                'fullScreen',
                'playList',
                'currentSong',
                'playing',
                'currentIndex',
                'mode',
                'theme',
                'sequenceList'
            ])
        },
        methods: {
            back() {
                this.setFullScreen(false);
            },
            open() {
                this.setFullScreen(true);
            },
            showPlayList() {
                this.$refs.playlist.show();
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
                if (this.currentLyric) {
                    this.currentLyric.togglePlay();
                }
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
              @interval 毫秒单位
              根据interval计算出歌曲分秒
             */
            formatTotalTime(interval) {
                // console.log("总时间:"+ interval);
                const minute = (interval % (1000 * 60 * 60)) / (1000 * 60) | 0;
                let secondChange = ((interval % (1000 * 60)) / 1000) | 0;
                //如果秒小于10,就在前面加上0
                if (secondChange < 10) {
                    secondChange = '0' + secondChange;
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
                if (this.playList.length === 1) {
                    this.loop();
                } else {
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
                }
                this.songReady = false;
            },
            next() {
                if (!this.songReady) {
                    return;
                }
                if (this.playList.length === 1) {
                    this.loop();
                } else {
                    let index = this.currentIndex + 1;
                    if (index === this.playList.length) {
                        //到最后一首就切到第一首
                        index = 0;
                    }
                    this.setCurrentIndex(index);
                    if (!this.playing) {
                        this.togglePlaying();
                    }
                }
                this.songReady = false;
            },
            //歌曲播放完成自动播放下一曲
            end() {
                //如果播放模式为单曲循环，则不切换歌曲
                if (this.mode === playMode.loop) {
                    this.loop();
                } else {
                    this.next();
                }
            },
            //单曲循环
            loop() {
                //将当前时间重置为0，然后再调用播放函数
                this.$refs.audio.currentTime = 0;
                this.$refs.audio.play();
                if (this.currentLyric) {
                    this.currentLyric.seek(0);
                }
            },
            //更改歌曲播放模式
            changeMode() {
                const mode = (this.mode + 1) % 3;
                this.setPlayMode(mode);
                //重置歌曲播放列表
                let list = null;
                // console.log(this.sequenceList);
                ////如果状态为随机播放，则将原有列表洗牌，否则就为顺序列表
                if (mode === playMode.random) {
                    list = shuffle(this.sequenceList);
                } else {
                    list = this.sequenceList;
                }
                //重置CurrentIndex和播放列表
                this.resetCurrentIndex(list);
                this.setPlayList(list);
            },
            /**
             * @list
             * 重置CurrentIndex,模式切换的时候，从新的播放列表里面找出当前播放歌曲的index
             * 保证模式切换时，当前歌曲不发生变化
             */
            resetCurrentIndex(list) {
                let index = list.findIndex((item) => {
                    return item.id === this.currentSong.id;
                });
                this.setCurrentIndex(index);
            },
            ready() {
                this.songReady = true;
                //将该首歌曲存放至vuex里面的playHistory中
                 this.savePlayHistory(this.currentSong);
            },
            error() {
                this.songReady = true;
            },
            paused() {
                this.setPlayingState(false);
                if (this.currentLyric) {
                    this.currentLyric.stop();
                }
            },
            onProgressBarChange(percent) {
                // console.log("totaltime:"+this.currentSong.dt);
                // console.log("currenttime:"+this.currentSong.dt * percent);
                const currentTime = (this.currentSong.time * percent) / 1000;
                this.$refs.audio.currentTime = currentTime;
                if (!this.playing) {
                    this.togglePlaying();
                }
                if (this.currentLyric) {
                    this.currentLyric.seek(currentTime * 1000);
                }
            },
            //获取当前播放歌曲的歌词
            loadLyric() {
                var v = this;
                return v.$axios.get('api/lyric', {
                    params: {
                        id: v.currentSong.id,
                    }
                });
            },
            //封装歌词
            getLyric() {
                var v = this;
                let lyric = '';
                this.loadLyric().then((resolve) => {
                    if (resolve.data.code === 200) {
                        lyric = resolve.data.lrc.lyric;
                        // console.log("未处理的歌词:");
                        // console.log(lyric);
                    }
                    v.currentLyric = new Lyric(lyric, this.handleLyric);
                    if (this.playing) {
                        // console.log("处理后的歌词:");
                        this.currentLyric.play();
                    }
                    // console.log(v.currentLyric);
                }).catch(()=>{
                    v.currentLyric = null;
                    v.playingLyric = '';
                    v.currentLineNum = 0;
                })
            },
            handleLyric({lineNum, txt}) {
                this.currentLineNum = lineNum;
                if (lineNum > 5) {
                    let lineEl = this.$refs.lyricLine[lineNum - 5];
                    this.$refs.lyricList.scrollToElement(lineEl, 1000);
                } else {
                    this.$refs.lyricList.scrollToElement(0, 0, 1000);
                }
                this.playingLyric = txt;
            },
            middleTouchStart(e) {
                this.touch.initiated = true;
                // 用来判断是否是一次移动
                this.touch.moved = false;
                const touch = e.touches[0];
                this.touch.startX = touch.pageX;
                this.touch.startY = touch.pageY;

            },
            middleTouchMove(e) {
                if (!this.touch.initiated) {
                    return
                }
                const touch = e.touches[0];
                const deltaX = touch.pageX - this.touch.startX;
                const deltaY = touch.pageY - this.touch.startY;
                //如果纵向滚动大于横向滚动,则不做处理
                if (Math.abs(deltaY) > Math.abs(deltaX)) {
                    return;
                }
                if (!this.touch.moved) {
                    this.touch.moved = true;
                }
                const left = this.currentShow === 'cd' ? 0 : -window.innerWidth;
                const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX));
                this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
                this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
                this.$refs.lyricList.$el.style[transitionDuration] = 0;
                this.$refs.middleL.style.opacity = 1 - this.touch.percent;
                this.$refs.middleL.style[transitionDuration] = 0;
            },
            middleTouchEnd() {
                if (!this.touch.moved) {
                    return;
                }
                let offsetWidth;
                let opacity;
                //从右向左滑动
                if (this.currentShow === 'cd') {
                    if (this.touch.percent > 0.1) {
                        offsetWidth = -window.innerWidth;
                        opacity = 0;
                        this.currentShow = 'lyric';
                    } else {
                        offsetWidth = 0;
                        opacity = 1;
                    }
                } else {
                    if (this.touch.percent < 0.9) {
                        offsetWidth = 0;
                        this.currentShow = 'cd';
                        opacity = 1;
                    } else {
                        offsetWidth = -window.innerWidth;
                        opacity = 0;
                    }
                }
                const time = 300;
                this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
                this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`;
                this.$refs.middleL.style.opacity = opacity;
                this.$refs.middleL.style[transitionDuration] = `${time}ms`;
            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN',
                setPlayingState: 'SET_PLAYING_STATE',
                setCurrentIndex: 'SET_CURRENT_INDEX',
                setPlayMode: 'SET_PLAY_MODE',
                setPlayList: 'SET_PLAYLIST'
            }),
            ...mapActions([
                'savePlayHistory'
            ])
        },
        watch: {
            currentSong(newSong, oldSong) {
                var v = this;
                if (!newSong.id) {
                    return;
                }
                if (newSong.id === oldSong.id) {
                    return;
                }
                if (this.currentLyric) {
                    this.currentLyric.stop();
                }
                setTimeout(() => {
                    v.$refs.audio.play();
                    //TODO 仍然有在网速不好时切换歌曲，歌词会先进行播放的bug
                    //获取歌曲歌词
                    v.getLyric();
                }, 1000);
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
            ProgressBar,
            Scroll,
            PlayList
        },
        mounted() {
            // console.log(this.currentSong);
        },
        created() {
            this.touch = {};
        }
    }
</script>

<style scoped>
    @import '../common/css/icon.css';

    .normal-player {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        background: #222;
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

    .normal-player .top .back .icon-close {
        display: block;
        padding: 9px;
        font-size: 24px;
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
        margin: 50px auto 0 auto;
        overflow: hidden;
        text-align: center;
    }

    .playing-lyric-wrapper .playing-lyric {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: rgb(255, 255, 255);
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
        color: white;
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
        text-align: center;
        font-size: 0;
    }

    .bottom .dot-wrapper .dot {
        display: inline-block;
        vertical-align: middle;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
    }

    .bottom .dot-wrapper .active {
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