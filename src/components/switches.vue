<template>
    <ul class="switches" :class="themeNumber">
        <li
                class="switch-item"
                v-for="(item,index) in switches"
                :class="themeChoose(index)"
                @click="switchItem(index)"
        >
            <span>{{item.name}}</span>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    export default {
        props: {
            switches: {
                type: Array,
                default: []
            },
            currentIndex: {
                type: Number,
                default: 0
            }
        },
        methods: {
            switchItem(index) {
                this.$emit("switch", index);
            },
            themeChoose(index){
                if (this.currentIndex === index){
                    return this.theme === 0 ? 'active1' : this.theme === 1 ? 'active2' : 'active3'
                }
            }
        },
        computed:{
            themeNumber() {
                return this.theme === 0 ? 'theme1' : this.theme === 1 ? 'theme2' : 'theme3'
            },
            ...mapGetters([
                'theme',
            ])
        }
    };
</script>

<style scoped>
    .switches {
        display: flex;
        align-items: center;
        width: 240px;
        margin: 0 auto;
        border-radius: 5px;
    }

    ul li{
        list-style: none;
    }
    .theme1 {
        border: 1px solid #ff7675;
    }

    .theme2 {
        border: 1px solid #87cbd8;
    }

    .theme3 {
        border: 1px solid #D6A2E8;
    }
    .switches .switch-item {
        flex: 1;
        padding: 8px;
        text-align: center;
        font-size: 14px;
        color: #666;
    }
    .switches .active1 {
        background: #ff7675;
        color: #fff;
    }

    .switches .active2 {
        background: #87cbd8;
        color: #fff;
    }

    .switches .active3 {
        background: #D6A2E8;
        color: #fff;
    }
    .switches .active {
        background: #D6A2E8;
        color: #fff;
    }
</style>
