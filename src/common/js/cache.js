//用于缓存

import storage from 'good-storage'

const SEARCH_KEY = '_search_';
const SEARCH_MAX_LENGTH = 15;

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