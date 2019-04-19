//用于缓存

import storage from 'xieyezi-storage'

const SEARCH_KEY = '_search_';
const THEME_KEY = '_theme_';
const SEARCH_MAX_LENGTH = 15;
const PLAY_KEY = '_play_';
const PLAY_MAX_LENGTH = 100;
const FAVORITE_KEY = '_favorite_';
const FAVORITE_MAX_LENGTH = 100;


//判断缓存中是否已经有当前搜索关键词
function insertArray(arr, val, compare, maxlen) {
    const index = arr.findIndex(compare);
    if (index === 0) {
        return;
    }
    if (index > 0) {
        arr.splice(index, 1);
    }
    arr.unshift(val);
    if (maxlen && arr.length > maxlen) {
        arr.pop();
    }
}

//从缓存中找到目标项并删除这一项
function deleteFormArray(arr,compare) {
    const  index = arr.findIndex(compare);
    if (index>-1){
        arr.splice(index,1);
    }

}
//将搜索关键词保存至缓存
export function saveSearch(query) {
    let searchs = storage.get(SEARCH_KEY, []);
    insertArray(searchs, query, (item) => {
        return item === query;
    }, SEARCH_MAX_LENGTH);
    storage.set(SEARCH_KEY,searchs);
    return searchs;
}
//每次都从缓存中取出历史搜索记录
export function loadSearch() {
    return storage.get(SEARCH_KEY,[]);
}

//从搜索历史列表中删除某一项
export function deleteSearch(query) {
    let searchs = storage.get(SEARCH_KEY, []);
    deleteFormArray(searchs,(item)=>{
        return item === query;
    });
    storage.set(SEARCH_KEY,searchs);
    return searchs;
}

//清空缓存里面的搜索历史
export function clearSearch() {
    storage.remove(SEARCH_KEY);
    return [];
}

//保存当前主题至缓存
export function saveTheme(theme) {
    storage.set(THEME_KEY,theme);
    return theme;
}

//从缓存中取出当前主题,如果没有，则默认为0(桃花粉)
export function loadTheme() {
    return storage.get(THEME_KEY,0);
}

//存储播放历史
export function savePlay(song) {
    let songs = storage.get(PLAY_KEY,[]);
    insertArray(songs,song,(item) =>{
        return item.id === song.id;
    },PLAY_MAX_LENGTH);
    storage.set(PLAY_KEY,songs);
    return songs;
}
//从缓存读取播放历史
export function loadPlay() {
    return storage.get(PLAY_KEY,[]);
}

//点击收藏歌曲
export function saveFavorite(song) {
    let songs = storage.get(FAVORITE_KEY,[]);
    insertArray(songs,song,(item) =>{
        return item.id === song.id;
    },FAVORITE_MAX_LENGTH);
    storage.set(FAVORITE_KEY,songs);
    return songs;
}

//从缓存读取收藏歌曲
export function loadFavorite(){
    return storage.get(FAVORITE_KEY,[]);
}

//从我的收藏里面删除一首歌曲
export function deleteFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, []);
    deleteFormArray(songs,(item)=>{
        return item.id === song.id;
    });
    storage.set(FAVORITE_KEY,songs);
    return songs ;
}