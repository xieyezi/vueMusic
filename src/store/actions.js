import * as types from './mutation-types'
import {playMode} from '../common/js/config'
import {shuffle} from "../common/js/util";

/**
 *
 * @param list
 * @param song
 * 当点击随机播放时，找出顺序播放时歌曲在随机播放列表里面的下标
 */
function findIndex(list,song) {
    return list.findIndex((item)=>{
        return item.id === song.id;
    })
}

export const selectPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST, list);
    //如果状态为随机播放，则将原有列表洗牌，否则就为当前列表
    if (state.mode === playMode.random) {
        let randomList = shuffle(list);
        commit(types.SET_PLAYLIST, randomList);
        index = findIndex(randomList,list[index]);

    }else {
        commit(types.SET_PLAYLIST, list);
    }
    commit(types.SET_CURRENT_INDEX, index);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
};
/**
 * 点击随机播放全部
 * @param commit
 * @param list
 */
export const randomPlay = function ({commit}, {list}) {
    commit(types.SET_PLAY_MODE, playMode.random);
    commit(types.SET_SEQUENCE_LIST, list);
    let randomList = shuffle(list);
    commit(types.SET_PLAYLIST, randomList);
    commit(types.SET_CURRENT_INDEX, 0);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
};