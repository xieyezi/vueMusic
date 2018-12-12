<template>
    <div id="app">
        <div class="tophead">
            <MHead></MHead>
            <Tab></Tab>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <player></player>
    </div>
</template>
<script>
    import MHead from 'components/mhead'
    import Tab from 'components/tab'
    import Player from 'components/player'
    export default {
        name: 'app',
        data() {
            return {}
        },
        components:{
            MHead,
            Tab,
            Player
        }
    }
</script>
<style>
    *{
        margin: 0px;

        dd
    }
    .tophead{
        position: fixed;
        width: 100%;
    }
    .loading-container{
        position: absolute;
        width: 100%;
        top:50%;
        transform: translateY(-50%);
    }
</style>
