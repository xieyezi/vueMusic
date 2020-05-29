Language: English | [中文简体](https://github.com/xieyezi/vueMusic)

<h1 align="center">Moment music Web APP</h1>

 <br />
 <div align="center">
 <img src="https://img.shields.io/badge/-vue-green"/>
 <img src="https://img.shields.io/badge/npm-v6.10.3-orange"/>
 <img src="https://img.shields.io/badge/build-passing-brightgreen"/>
</div> 
<br />
<br />

> The API comes from [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi), I would like to thank those who helped me in the process of doing this project.

> <br /> <br />
> Preview address: http://xieyezi.com (please use the mobile phone debugging mode of the browser to view)

> For mobile phone, please scan the QR code below:

![时刻音乐二维码.png](https://cdn.xieyezi.com/%E9%9F%B3%E4%B9%90%E4%BA%8C%E7%BB%B4%E7%A0%81.png)

### Original intention

It has been almost a year since I contacted Vue for 18 years. I wanted to make my own music app as a sophomore in college, because I like music very much, plus I am still a NetEase cloud musician 👉 [写夜子](https://music.163.com/#/artist?id=12478216), for this I learned `Android`, but I was too helpless, but I learned poorly, so I could n’t do it in the end. Plus I thought that only doing the `Android` version can not achieve cross-platform, so later began to consider using the front-end to achieve.

### Features

| Features                 | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| Home page recommendation | Home page header map, the following is a recommended song list |
| Playlist details         | Click on the playlist or singer to enter the playlist details  |
| Singer selection         | Various types of singer selection                              |
| Leaderboards             | Various Leaderboards                                           |
| Recently Listened        | Just click to listen and join "Recently Listened"              |
| My Favorites             | Click "Heart" in the playback interface to add "My Favorites"  |
| Theme Skin Change        | Skin Change Function                                           |
| Song mode switching      | Random play, single loop, list loop                            |
| Search                   | Support singer and song name search                            |

### Preview

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

### Construct

This project started in December 2018, and it was only completed in May this year. The main structure is as follows:

<img src="https://i.loli.net/2019/08/26/r1hvlGK4Db87eZ9.jpg"/>

| Language / Platform | Description                                          |
| ------------------- | ---------------------------------------------------- |
| vue                 | vue.js complete the front-end functional interaction |
| vue-router          | Responsible for routing                              |
| vuex                | State Management                                     |
| localstorage        | Song cache and theme information cache               |
| webpack             | Project Packing                                      |
| rollup              | module packaging                                     |
| ES6                 | Main Syntax                                          |
| docker              | Deploy with docker-compose                           |
| Alibaba Cloud       | Alibaba Cloud server is Linux                        |

### Configuration file

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

### Use shuffle function to generate random playlist

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

### debounce

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

### docker

This project is deployed with one-click docker-compose, the front end uses nginx as the container, and the back end uses node.js. By configuring nginx.conf, the front end requests a reverse proxy to the background.

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

1.  Clone : `git clone https://github.com/xieyezi/myMusic.git`
2.  Install dependencies: `cd myMusic && npm install`
3.  run: `npm run serve` 或者 `npm run start`
4.  Enter the background service catalog: `cd server`
5.  Install dependencies: `npm install`
6.  run: `node app.js`

### Questions

[Threre](https://github.com/xieyezi/myMusic/issues)

### Open source certificate

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
