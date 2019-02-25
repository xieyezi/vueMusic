/*
 工具函数
 */

//洗牌函数的辅助函数
function getRandomInt(min, max) {
    //floor为向下取整
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//洗牌函数
export function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        let j = getRandomInt(0,i);
        let temp = arr[i];
        arr[i]=arr[j];
        arr[j] = temp;
    }
    return arr;
}