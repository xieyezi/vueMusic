<template>
    <div class="search-list" v-show="searches.length">
        <transition-group name="list" tag="ul">
            <li :key="item" class="search-item" @click="selectItem(item)" v-for="item in searches">
                <span class="text">{{item}}</span>
                <span class="icon" @click.stop="deleteOne(item)">
                 <Icon size="20" type="ios-close" />
                </span>
            </li>
        </transition-group>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            searches: {
                type: Array,
                default: []
            }
        },
        methods: {
            selectItem(item) {
                this.$emit('select', item)
            },
            deleteOne(item) {
                this.$emit('delete', item)
            }
        }
    }
</script>

<style scoped>
    .search-list .search-item {
        display: flex;
        align-items: center;
        height: 40px;
        overflow: hidden;
    }

    .text {
        flex: 1;
        color: #666;
        font-size: 14px;
    }

    .list-enter-active, .list-leave-active {
        transition: all 0.1s
    }


    .list-enter, .list-leave-to {
        height: 0
    }

    .icon {
       /*extend-click()*/
    }


</style>
