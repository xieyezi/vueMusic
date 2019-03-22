<template>
    <div class="search">
        <div class="search-box-wrapper">
            <search-box ref="searchBox" @query="onQueryChange"></search-box>
        </div>
        <div class="shortcut-wrapper" v-show="!query">
            <div class="shortcut">
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                        <li @click="addQuery(item.first)" class="item" v-for="item in hotKey">
                            <span>{{item.first}}</span>
                        </li>
                    </ul>
                </div>
                <div class="search-history" v-show="searchHistory.length">
                    <h1 class="title">
                        <span class="text">搜索历史</span>
                        <span class="clear" @click="showConfirm">
                                <Icon size="18" type="ios-trash-outline"/>
                        </span>
                    </h1>
                    <search-list @select="addQuery" @delete="deleteSearchHistory"
                                 :searches="searchHistory"></search-list>
                </div>
            </div>
        </div>
        <div class="search-result" v-show="query" ref="searchResult">
            <suggest @select="saveSearch" @listScroll="blurInput" :query="query" ref="suggest"></suggest>
        </div>
        <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史?" confirmBtnText="清空"></confirm>
    </div>
</template>

<script>
    import SearchBox from '../components/search-box'
    import Suggest from './suggest'
    import Confirm from '../components/confirm'
    import SearchList from '../components/search-list'
    import {playlistMixin} from '../common/js/mixin'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "search",
        mixins: [playlistMixin],
        data() {
            return {
                hotKey: [],
                query: '',
            }
        },
        components: {
            SearchBox,
            Suggest,
            SearchList,
            Confirm
        },
        computed: {
            ...mapGetters([
                'searchHistory'
            ])
        },
        methods: {
            handlePlayList(playlist) {
                const bottom = playlist.length > 0 ? '60px' : '';
                this.$refs.searchResult.style.bottom = bottom;
                this.$refs.suggest.refresh();
            },
            blurInput() {
                this.$refs.searchBox.blur();
            },
            loadHotSearch() {
                var v = this;
                v.$axios.get('api/search/hot')
                    .then(response => {
                        if (response.data.code === 200) {
                            v.hotKey = response.data.result.hots;
                            //console.log(v.hotKey);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            addQuery(query) {
                this.$refs.searchBox.setQuery(query);
            },
            onQueryChange(query) {
                this.query = query;
            },
            //将搜索关键词保存至缓存和vuex
            saveSearch() {
                this.saveSearchHistory(this.query);
            },
            showConfirm(){
                this.$refs.confirm.show();
            },
            ...mapActions([
                'saveSearchHistory',
                'deleteSearchHistory',
                'clearSearchHistory'
            ])
        },
        created() {
            this.loadHotSearch();
        }

    }
</script>

<style scoped>
    .search {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
        /*background: rgba(135, 203, 216,0.1);*/
    }

    .search-box-wrapper {
        margin: 20px;
        /*background: rgb(135, 203, 216);*/
    }

    .shortcut-wrapper {
        position: fixed;
        top: 178px;
        bottom: 0;
        width: 100%;
    }

    .shortcut {
        height: 100%;
        overflow: hidden;
    }

    .hot-key {
        margin: 0 20px 20px 20px;
    }

    .hot-key .title {
        margin-bottom: 20px;
        font-size: 14px;
        /*color: $color-text-l*/
    }

    .hot-key .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: #F5F5F5;
        font-size: 14px;
        color: #666;
    }

    .search-history {
        position: relative;
        margin: 0 20px;
    }

    .search-history .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: 14px;
        /*color: $color-text-l*/
    }

    .search-history .title .text {
        flex: 1
    }

    .search-history .title .clear {
        font-size: 14px;
        /*color: $color-text-d*/
    }

    .search-result {
        position: fixed;
        width: 100%;
        top: 175px;
        bottom: 0;
    }
</style>