import {playMode} from "../common/js/config";

const state = {
    singer: {},
    playing: false, //播放状态
    fullScreen: false, //是否全屏
    playList: [],   //播放列表
    sequenceList: [],  //顺序列表
    mode: playMode.sequence,  //播放模式(默认为顺序播放)
    currentIndex: -1,   //当前播放歌曲的索引
    disc: {} //歌单
};

export default state;