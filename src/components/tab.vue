<template>
    <div class="tab" :class="themeNumber">

        <router-link tag="div" class="tab-item" :to="{ name: 'recommend', params: {} }" exact>
            <span class="tab-link">推荐</span>
        </router-link>


        <router-link tag="div" class="tab-item" :to="{ name: 'singer', params: {} }" exact>
                <span class="tab-link">
                    <span class="tab-link">歌手</span>
                </span>
        </router-link>


        <router-link tag="div" class="tab-item" :to="{ name: 'rank', params: {} }" exact>
            <span class="tab-link">排行</span>
        </router-link>


        <router-link tag="div" class="tab-item" :to="{ name: 'search', params: {} }" exact>
            <span class="tab-link">搜索</span>
        </router-link>


    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "tab",
        computed: {
            themeNumber() {
                return this.theme === 0 ? 'theme1' : this.theme === 1 ? 'theme2' : 'theme3'
            },
            ...mapGetters([
                'theme',
            ])
        },
    }
</script>

<style scoped>
    .tab {
        display: flex;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        /*background: #87CBD8;*/
        /*background: #ff7675;*/
    }
    .theme1{
        background: #ff7675;
    }
    .theme2{
        background: #87cbd8;
    }
    .theme3{
        background: #D6A2E8;
    }
    .tab-item {
        flex: 1;
        text-align: center;
    }

    .tab-link {
        padding-bottom: 5px;
        color: rgba(0, 0, 0, 0.8);
    }

    .active .tab-link {
        color: rgba(255, 255, 255, 0.8);
        border-bottom: 2px solid #fff;
    }
</style>