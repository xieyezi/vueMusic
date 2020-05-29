Language: [English](README-EN.md) | 中文简体

<h1 align="center">时刻音乐Web APP</h1>

 <br />
 <div align="center">
 <img src="https://img.shields.io/badge/-vue-green"/>
 <img src="https://img.shields.io/badge/npm-v6.10.3-orange"/>
 <img src="https://img.shields.io/badge/build-passing-brightgreen"/>
</div> 
<br />
<br />

> API 来自[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)，在此特此铭谢。同样，也在此铭谢在做这个项目的过程中给我帮助的人们。
> <br />  <br />

> 预览地址：http://xieyezi.com (请使用浏览器的手机调试模式进行查看)

> 手机端请扫描下方二维码:

![时刻音乐二维码.png](https://cdn.xieyezi.com/%E9%9F%B3%E4%B9%90%E4%BA%8C%E7%BB%B4%E7%A0%81.png)

### 设计初衷

从 18 年接触 vue 开始到现在，目前也差不多有一年了。自己早在大学大二时开始就想做一个自己的音乐 App，因为自己很喜欢音乐，加上自己还是个网易云音乐人 👉[写夜子](https://music.163.com/#/artist?id=12478216)，为此我学习了`Android`,但是无奈本人太菜 😅，学得比较差，所以到最后也是不了了之。加上我想到只做`Android`版本也无法实现跨平台，所以后来开始考虑用前端来实现。

### 功能

| 功能         | 描述                                 |
| ------------ | ------------------------------------ |
| 首页推荐     | 首页头部导航图、下面为精品歌单推荐   |
| 歌单详情     | 点击歌单或者歌手进入歌单详情         |
| 歌手选择     | 各大类歌手选择                       |
| 排行榜       | 各类排行榜                           |
| 最近收听     | 只要点击了收听就会加入”最近收听“     |
| 我的喜欢     | 在播放界面点击“心”就会加入“我的喜欢” |
| 主题换肤     | 换肤功能                             |
| 歌曲模式切换 | 随机播放、单曲循环、列表循环         |
| 搜索         | 支持歌手和歌曲名搜索                 |

### 预览

 <br />
<div text="center">
 <img width="48%" src="https://i.loli.net/2019/08/26/L27FlTkz8wQSyZh.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/aIr1wLHx8FXPc24.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/ZXJoTAb3FP76IkQ.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/QvVWMgr3CPZ6plU.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/9EpIrjS3JTm1X7Q.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/3I2iwyRm5eLarFV.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/e2cMpFDqyNlaGZV.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/aWtRoi5e3F71VCz.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/KPzdhc8aqRZ6U2A.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/tvK2QbY6jFBgdpn.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/bl75R2I8oV1WAuF.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/Stq9bUMniLIGaAs.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/yBN3rcoA4GSq5Fu.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/MdztuheB1LHSDPb.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/a6Iw9RKoQgjqxHc.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/6XRvDcTba4LKghF.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/pXiwL6QNErdbyoh.png"/>
 <img width="48%" src="https://i.loli.net/2019/08/26/3UAKDasZjfVM7yQ.png"/>
</div> 
 <br />

### 构建

这个项目开始于 2018 年 12 月，磕磕绊绊得到今年 5 月才完成。主要构建如下:

 <img src="https://i.loli.net/2019/08/26/r1hvlGK4Db87eZ9.jpg"/>

| 语言/平台    | 描述                         |
| ------------ | ---------------------------- |
| vue          | vue.js 完成前台功能交互      |
| vue-router   | 负责处理路由                 |
| vuex         | 状态管理                     |
| localstorage | 歌曲缓存和主题信息缓存       |
| webpack      | 项目打包                     |
| rollup       | 模块打包                     |
| ES6          | 主要语法                     |
| docker       | 利用 docker-compose 进行部署 |
| 阿里云       | 阿里云服务器为 linux         |

### 配置文件

```js
export const playMode = {
  sequence: 0, //顺序播放
  loop: 1, //单曲循环
  random: 2, //随机播放
}
export const themeNumber = {
  pink: 0, //桃花粉
  cyan: 1, //绿松青
  violet: 2, //丁香紫
}
```

### 利用洗牌函数生成随机播放列表

```js
//洗牌函数,打乱歌曲顺序
export function shuffle(arr) {
  let _arr = arr.slice()
  //保留arr,制作一个副本
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let temp = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = temp
  }
  return _arr
}
```

### 防抖

```
export function debounce(func, delay) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay)
    }
}
```

### docker 部署

本项目通过 docker-compose 一键部署，前端利用 nginx 做容器，后端则使用 node.js。通过配置 nginx.conf，前端请求反向代理到后台。

```docker
version: '3'
services:
  music-web:
    container_name: 'music-web-container'  #容器名称
    image: nginx  #指定镜像
    restart: always
    ports:
      - 80:80
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf  #挂载nginx配置
      - ./dist:/usr/share/nginx/html/    #挂载n项目
    depends_on:
      - music-server
  music-server:
    container_name: 'music-server-container'
    build: ./server  #根据server目录下面的Dockerfile构建镜像
    restart: always
    expose:
      - 3000
```

nginx.conf:

```nginx
#user  nobody;
worker_processes  1;
events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;
	gzip on;
    gzip_min_length  5k;
    gzip_buffers     4 16k;
    #gzip_http_version 1.0;
    gzip_comp_level 3;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;

    server {
        listen  80;
		server_name  www.xieyezi.com;

		#音乐app项目
		location / {
		 index index.html index.htm;   #添加属性。
         root /usr/share/nginx/html;   #站点目录
		}
		#音乐app项目设置代理转发
        location /api/ {
          proxy_pass  http://music-server:3000/;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
             root   /usr/share/nginx/html;
        }

    }

}
```

### 快速开始

1.  clone 项目: `git clone https://github.com/xieyezi/myMusic.git`
2.  安装依赖: `cd myMusic && npm install`
3.  运行: `npm run serve` 或者 `npm run start`
4.  进入后台服务目录: `cd server`
5.  安装依赖: `npm install`
6.  启动后台服务: `node app.js`

### 提问与交流

[点击这里](https://github.com/xieyezi/myMusic/issues)

### 开源证书

```
MIT License

Copyright (c) 2018-present xieyezi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
