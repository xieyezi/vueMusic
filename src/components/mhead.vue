<template>
    <div class="mhead" :class="themeNumber">
        <span class="icon"><Icon type="ios-musical-notes-outline"/></span>
        <h2 class="text">时刻音乐</h2>
        <span class="icon"><Icon type="ios-musical-notes-outline"/></span>
        <div class="iconimg" @click="toMenu">
            <Icon type="md-menu"/>
        </div>
       <div>
           <Drawer width="100" v-model="drawer">
               <div style="width: 100%;">
                   <img :src="backgroundImg" style="width: 100%;height: auto"/>
               </div>
               <CellGroup>
                   <div @click="closeDrawer">
                       <Cell title="最近播放" to="user-center"/>
                   </div>
                   <div @click="closeDrawer">
                       <Cell title="我的收藏" to="user-center"/>
                   </div>
                   <div @click="closeDrawer">
                       <Cell title="主题换肤" to="theme"/>
                   </div>
                   <div @click="closeDrawer">
                       <Cell title="关于时刻" to="about"/>
                   </div>
               </CellGroup>
           </Drawer>
       </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "mhead",
        data() {
            return {
                drawer: false,
                backgroundImgList:[
                    'http://cdn.xieyezi.com/background1.svg',
                    'http://cdn.xieyezi.com/background2.svg',
                    'http://cdn.xieyezi.com/background3.svg'
                ]
            }
        },
        computed: {
            themeNumber() {
                return this.theme === 0 ? 'theme1' : this.theme === 1 ? 'theme2' : 'theme3'
            },
            backgroundImg(){
                return this.theme === 0 ? this.backgroundImgList[0] : this.theme === 1 ? this.backgroundImgList[1] : this.backgroundImgList[2]
            },
            ...mapGetters([
                'theme',
            ])
        },
        methods: {
            toMenu() {
                this.drawer = true;
            },
            closeDrawer(){
                this.drawer = false;
            }
        }
    }
</script>

<style scoped>
    .mhead {
        position: relative;
        height: 44px;
        width: 100%;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);
    }

    .theme1 {
        background: #ff7675;
    }

    .theme2 {
        background: #87cbd8;
    }

    .theme3 {
        background: #D6A2E8;
    }

    .mhead .iconimg {
        position: absolute;
        display: inline-block;
        margin-top: 6px;
        right: 10px;
        width: 30px;
        height: 32px;
        font-size: 20px;
        border-radius: 50%;
        background-size: 28px 28px;

    }

    .mhead .text {
        display: inline-block;
        vertical-align: top;
        margin-top: 6px;
        line-height: 30px;
        font-size: 18px;
    }

    .mhead .icon {
        margin-top: 6px;
        display: inline-block;
        vertical-align: top;
        line-height: 30px;
        font-size: 18px;
    }
</style>