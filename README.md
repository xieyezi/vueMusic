<h1 align="center">时刻音乐Web APP</h1>

 <br />
 <div align="center">
 <img src="https://img.shields.io/badge/-vue-green"/>
 <img src="https://img.shields.io/badge/npm-v6.10.3-orange"/>
 <img src="https://img.shields.io/badge/build-passing-brightgreen"/>
</div> 
<br />
<br />

 > API来自[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)，在此特此铭谢。同样，也在此铭谢在做这个项目的过程中给我帮助的人们。
<br />
<br />
>预览地址：www.xieyezi.com (请使用浏览器的手机调试模式进行查看)    
>手机端请扫描下方二维码:            
![时刻音乐二维码.png](https://i.loli.net/2019/08/26/uGFDrqefA9yc5O8.png)
 
 ## 设计初衷
   
   从18年接触vue开始到现在，目前也差不多有一年了。自己早在大学大二时开始就想做一个自己的音乐App，因为自己很喜欢音乐，加上自己还是个网易云音乐人👉[写夜子](https://music.163.com/#/artist?id=12478216)，为此我学习了`Android`,但是无奈本人太菜😅，学得比较差，所以到最后也是不了了之。加上我想到只做`Android`版本也无法实现跨平台，所以后来开始考虑用前端来实现。
## 功能

功能 | 描述
---- | ---
首页推荐 | 首页头部导航图、下面为精品歌单推荐
歌单详情 | 点击歌单或者歌手进入歌单详情
歌手选择 | 各大类歌手选择
排行榜   |	各类排行榜
最近收听 |	只要点击了收听就会加入”最近收听“
我的喜欢 |	在播放界面点击“心”就会加入“我的喜欢”
主题换肤 |	换肤功能
歌曲模式切换     |  随机播放、单曲循环、列表循环
搜索     |	支持歌手和歌曲名搜索

## 构建
  
 这个项目开始于2018年12月，磕磕绊绊得到今年5月才完成。主要构建如下:

语言/平台 | 描述
---- | ---
vue | vue.js完成前台功能交互
vue-router | 负责处理路由
vuex | 状态管理
localstorage   |	歌曲缓存和主题信息缓存
webpack |	项目打包
rollup |	模块打包
ES6 |	主要语法
docker     |  利用docker-compose进行部署
阿里云     |	阿里云服务器为linux 


<img width="70%" src="https://i.loli.net/2019/08/26/r1hvlGK4Db87eZ9.jpg"/>



   