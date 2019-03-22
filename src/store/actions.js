import * as types from './mutation-types'
import {playMode} from '../common/js/config'
import {shuffle} from "../common/js/util";
import {saveSearch, deleteSearch, clearSearch, saveTheme} from '../common/js/cache'

/**
 *
 * @param list
 * @param song
 * 当点击随机播放时，找出顺序播放时歌曲在随机播放列表里面的下标
 */
function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id;
    })
}

export const selectPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST, list);
    //如果状态为随机播放，则将原有列表洗牌，否则就为当前列表
    if (state.mode === playMode.random) {
        let randomList = shuffle(list);
        commit(types.SET_PLAYLIST, randomList);
        index = findIndex(randomList, list[index]);

    } else {
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

/**
 * 插入歌曲到当前播放列表
 * @param commit
 * @param state
 * @param song
 */
export const insertSong = function ({commit, state}, song) {
    let playList = state.playList.slice();
    let sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;
    //插入到当前播放列表
    //记录当前歌曲
    let currentSong = playList[currentIndex];
    //查找播放列表中是否已经有待插入歌曲
    let fpIndex = findIndex(playList, song);
    //插入歌曲，索引加1
    currentIndex++;
    playList.splice(currentIndex, 0, song);
    //如果已经存在，插入后则将其删除
    if (fpIndex > -1) {
        //如果当前插入的序号大于列表中的序号
        if (currentIndex > fpIndex) {
            playList.splice(fpIndex, 1);
            currentIndex--;
        } else {
            playList.splice(fpIndex + 1, 1);
        }
    }
    //插入到顺序列表中
    let currentSIndex = findIndex(sequenceList, currentSong) + 1;
    let fsIndex = findIndex(sequenceList, song);
    sequenceList.splice(currentSIndex, 0, song);
    if (fsIndex > -1) {
        if (currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1);
        } else {
            sequenceList.splice(fsIndex + 1, 1);
        }
    }
    commit(types.SET_PLAYLIST, playList);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_CURRENT_INDEX, currentIndex);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.SET_PLAYING_STATE, true);
};

/**保存搜索历史
 *
 * @param commit
 * @param query
 */
export const saveSearchHistory = function ({commit}, query) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query));
};
/**
 * 删除搜索历史
 * @param commit
 * @param query
 */
export const deleteSearchHistory = function ({commit}, query) {
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query));
};
/**
 * 清空搜索历史
 * @param commit
 */
export const clearSearchHistory = function ({commit}) {
    commit(types.SET_SEARCH_HISTORY, clearSearch());
};

export const changeTheme = function ({commit}, theme) {
    console.log("进入action");
    console.log(theme);
    commit(types.SET_THEME, saveTheme(theme));
};