<template>
    <transition name="list-fade">
        <div class="playlist" v-show="showFlag" @click="hide">
            <div class="list-wrapper" @click.stop>
                <div class="list-header">
                    <h1 class="title">
                        <span class="text">当前播放列表</span>
                        <span class="clear" @click="showConfirm">
                            <Icon size="22" color="#666" type="ios-trash-outline"/>
                        </span>
                    </h1>
                </div>
                <scroll :data="sequenceList" ref="listContent" class="list-content">
                    <transition-group name="list" tag="ul">
                        <li :key="item.id" ref="listItem" class="item" v-for="(item,index)  in sequenceList"
                            @click="selectItem(item,index)">
                            <Icon class="current" color="#666" size="18" :type="getCurrentIcon(item)"/>
                            <span class="text">{{item.name}} - {{item.ar}}</span>
                            <span class="like" @click.stop="toggleFavorite(item)">
                                <i class="icon" :class="getFavoriteIconGray(item)"></i>
                            </span>
                            <span class="delete" @click.stop="deleteOne(item)">
                                <Icon color="#666" size="26" type="ios-close"/>
                            </span>
                        </li>
                    </transition-group>
                </scroll>
                <div class="list-operate">
                    <div class="add">
                        <i class="icon-add"></i>
                        <span class="text"></span>
                    </div>
                </div>
                <div class="list-close" :class="themeNumber" @click="hide">
                    <span>关闭</span>
                </div>
            </div>
            <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirm-btn-text="清空"></confirm>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">

    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import {playMode} from "../common/js/config";
    import Scroll from '../components/scroll'
    import Confirm from '../components/confirm'
    import {playerMixin} from '../common/js/mixin'

    export default {
        mixins: [playerMixin],
        data() {
            return {
                showFlag: false,
                refreshDelay: 120
            }
        },
        computed: {
            themeNumber() {
                return this.theme === 0 ? 'theme1' : this.theme === 1 ? 'theme2' : 'theme3'
            },
            ...mapGetters([
                'sequenceList',
                'currentSong',
                'playList',
                'mode',
                'theme'
            ])
            // modeText() {
            //     return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
            // }
        },
        methods: {
            show() {
                this.showFlag = true;
                setTimeout(() => {
                    this.$refs.listContent.refresh();
                    this.scrollToCurrent(this.currentSong);
                }, 20)
            },
            hide() {
                this.showFlag = false
            },
            showConfirm() {
                this.$refs.confirm.show();
            },
            confirmClear() {
                this.deleteSongList();
                this.hide();
            },
            getCurrentIcon(item) {
                if (this.currentSong.id === item.id) {
                    return 'ios-musical-notes-outline'
                }
                return ''
            },
            selectItem(item, index) {
                if (this.mode === playMode.random) {
                    index = this.playList.findIndex((song) => {
                        return song.id === item.id;
                    })
                }
                this.setCurrentIndex(index);
                this.setPlayingState(true);
            },
            scrollToCurrent(current) {
                const index = this.sequenceList.findIndex((song) => {
                    return current.id === song.id;
                });
                this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300);
            },
            deleteOne(item) {
                this.deleteSong(item);
                if (!this.playList.length) {
                    this.hide();
                }
            },
            ...mapMutations({
                setCurrentIndex: 'SET_CURRENT_INDEX',
                setPlayingState: 'SET_PLAYING_STATE',
            }),
            ...mapActions([
                'deleteSong',
                'deleteSongList'
            ])
        },
        watch: {
            currentSong(newSong, oldSong) {
                if (!this.showFlag || newSong.id === oldSong.id) {
                    return;
                }
                setTimeout(() => {
                    this.scrollToCurrent(newSong);
                }, 20)
            }
        },
        components: {
            Scroll,
            Confirm,
            // AddSong
        }
    }
</script>

<style scoped>
    @import '../common/css/icon.css';

    .playlist {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 200;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .list-fade-enter-active, .list-fade-leave-active {
        transition: opacity 0.3s;

    }

    .list-fade-enter, .list-fade-leave-to {
        opacity: 0
    }

    .red {
        color: #d81e06;
    }

    .list-wrapper {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #F5F5F5;
    }


    .list-header {
        position: relative;
        padding: 20px 30px 10px 20px;
    }


    .list-header .title {
        display: flex;
        align-items: center;
    }


    .list-header .icon {
        margin-right: 10px;
        font-size: 30px;
        /*color: #666;*/
    }


    .list-header .title .text {
        flex: 1;
        font-size: 14px;
        /*color: $color-text-l               */
    }


    .clear .icon-clear {
        font-size: 14px;
        /*color: $color-text-d*/

    }

    .list-content {
        max-height: 240px;
        overflow: hidden;
    }


    .list-content .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
    }


    .list-content .list-enter-active, .list-leave-active {
        transition: all 0.2s linear;
    }


    .list-content .list-enter, .list-leave-to {
        height: 0;
    }


    .list-content .item .current {
        flex: 0 0 20px;
        width: 20px;
        font-size: 12px;
        /*color: $color-theme-d*/
    }


    .list-content .item .text {
        flex: 1;
        /*no-wrap()*/
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /*color: $color-text-d*/
    }

    .list-content .like {
        margin-right: 15px;
    }
    .list-content .like .icon{
        display: block;
        /*padding: 9px;*/
        font-size: 16px;
    }

    .list-content .item .delete {
        /*font-size: 12px;*/
        /*color: $color-theme*/
    }


    .list-operate {
        width: 140px;
        margin: 10px auto 10px auto;
    }


    .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        /*border: 1px solid #666;*/
        /*border-radius: 100px;*/
        /*color: #666;*/
    }


    .add .icon-add {
        margin-right: 5px
        /*font-size: $font-size-small-s*/
    }


    .add .text {
        /*font-size: $font-size-small;*/
        font-size: 12px;
    }


    .list-close {
        text-align: center;
        line-height: 50px;
        font-size: 14px;
        color: white;
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

</style>
