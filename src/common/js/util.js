/*
 工具函数
 */

//洗牌函数的辅助函数
function getRandomInt(min, max) {
    //floor为向下取整
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//洗牌函数,打乱歌曲顺序
export function shuffle(arr) {
    let _arr = arr.slice();
    //保留arr,制作一个副本
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0,i);
        let temp = _arr[i];
        _arr[i]=_arr[j];
        _arr[j] = temp;
    }
    return _arr;
}

//截流函数 防止输入一个字符就去请求
export function debounce(func, delay) {
    let timer;

    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}