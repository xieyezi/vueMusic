<template>
    <transition name="slide">
        <div class="singerDetail">
            歌手详情页面
        </div>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "singerDetail",
        data() {
            return {
                id:''
            }
        },
        computed:{
            ...mapGetters([
                'singer'
            ])
        },
        created(){
            this.id = decodeURIComponent(this.$route.query.id);
            //console.log(this.id);
            console.log(this.singer);
        }
    }
</script>

<style scoped>
    .singerDetail {
        position: fixed;
        z-index: 100;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background: gray;
    }
    .slide-enter-active, .slide-leave-active{
        transition: all 0.3s;
    }
    .slide-enter, .slide-leave-to{
        transform: translate3d(100%, 0, 0);
    }
</style>