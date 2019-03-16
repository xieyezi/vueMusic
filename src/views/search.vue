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
            </div>
        </div>
        <div class="search-result" v-show="query" ref="searchResult">
            <suggest :query="query" ref="suggest"></suggest>
        </div>
    </div>
</template>

<script>
    import SearchBox from '../components/search-box'
    import Suggest from './suggest'
    import {playlistMixin} from '../common/js/mixin'
    export default {
        name: "search",
        mixins: [playlistMixin],
        data() {
            return {
                hotKey: [],
                query:'',
            }
        },
        components: {
            SearchBox,
            Suggest
        },
        methods: {
            handlePlayList(playlist) {
                const bottom = playlist.length > 0 ? '60px' : '';
                this.$refs.searchResult.style.bottom = bottom;
                this.$refs.suggest.refresh();
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
            onQueryChange(query){
                this.query = query;
            }
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