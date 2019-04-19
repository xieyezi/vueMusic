<template>
    <ul class="switches">
        <li
                class="switch-item"
                v-for="(item,index) in switches"
                :class="{'active':currentIndex === index}"
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
            }
        },
        computed:{
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
        border: 1px solid #87cbd8;
    }
    ul li{
        list-style: none;
    }

    .switches .switch-item {
        flex: 1;
        padding: 8px;
        text-align: center;
        font-size: 14px;
        color: #666;
    }

    .switches .active {
        background: #87cbd8;
        color: #fff;
    }
</style>
