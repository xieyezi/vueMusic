<template>
    <div class="mhead" :class="themeNumber">
        <h2 class="text">觉非音乐</h2>
        <div class="iconimg" @click="toMenu">
            <Icon  type="md-menu" />
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "mhead",
        computed: {
            themeNumber() {
                return this.theme === 0 ? 'theme1' : this.theme === 1 ? 'theme2' : 'theme3'
            },
            ...mapGetters([
                'theme',
            ])
        },
        methods:{
            toMenu(){
                this.$router.push({
                    path: '/menu'
                });
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
</style>