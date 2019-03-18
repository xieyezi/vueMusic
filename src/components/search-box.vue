<template>
    <div class="searchBox">
        <div class="search-box" :class="themeNumber">
            <i class="icon-search"></i>
            <input ref="query" :placeholder="placeholder" v-model="query" class="box" :class="themeNum"/>
            <i v-show="query" @click="clear" class="icon-delete"></i>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {debounce} from "../common/js/util";

    export default {
        name: "search-box",
        props: {
            placeholder: {
                type: String,
                default: '搜索歌曲、歌手'
            }
        },
        computed: {
            themeNumber() {
                return this.theme === 0 ? 'theme1' : this.theme === 1 ? 'theme2' : 'theme3'
            },
            themeNum(){
                return this.theme === 0 ? 'theme1-1' : this.theme === 1 ? 'theme2-1' : 'theme3-1'
            },
            ...mapGetters([
                'theme',
            ])
        },
        data() {
            return {
                query: ''
            }
        },
        methods: {
            clear() {
                this.query = '';
            },
            blur() {
                this.$refs.query.blur();
            },
            setQuery(query) {
                this.query = query;
            }
        },
        created() {
            this.$watch('query', debounce((newQuery) => {
                this.$emit('query', newQuery);
            },200));
        }
    }
</script>

<style scoped>
    @import '../common/css/icon.css';

    .searchBox {
    }

    .search-box {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding: 0 6px;
        height: 40px;
        /*background: rgba(135, 203, 216, 0.7);*/
        border-radius: 6px;
    }

    .icon-search {
        font-size: 22px;
        /*color: royalblue;*/
    }

    .box {
        flex: 1;
        margin: 0 5px;
        line-height: 18px;
        /*background: rgba(135, 203, 216, 0.05);*/
        color: #666666;
        font-size: 14px;
        outline: 0;
        border: 0;
    }
    .theme1{
        background: rgba(255,118,117,0.7);
    }
    .theme2{
        background: rgba(135,203,216,0.7);
    }
    .theme3{
        background: rgba(214,162,232,0.7);
    }
    .theme1-1{
        background: rgba(255,118,117,0.05);
    }
    .theme2-1{
        background: rgba(135,203,216,0.05);
    }
    .theme3-1{
        background: rgba(214,162,232,0.05);
    }
    input::placeholder {
        color: #666666;
    }

    .icon-delete {
        font-size: 18px;
        /*color: royalblue;*/
    }

    .searchInfo {
        position: relative;
        margin-left: 10px;
        padding-top: 10px;
        font-size: 14px;
        color: steelblue;
    }
</style>