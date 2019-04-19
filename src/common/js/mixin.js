import {mapGetters,mapActions} from "vuex";


export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playList'
        ])
    },
    mounted() {
        this.handlePlayList(this.playList);
    },
    activated() {
        this.handlePlayList(this.playList);
    },
    watch: {
        playList(newVal) {
            this.handlePlayList(newVal);
        }
    },
    methods: {
        handlePlayList() {
            throw new Error('component must implement handlePlayList method!');

        }
    }
};
export const playerMixin = {
    computed: {
        ...mapGetters([
            'favoriteList'
        ])
    },
    methods: {
        toggleFavorite(song) {
            if (this.isFavorite(song)) {
                this.deleteFavoriteList(song);
            } else {
                this.saveFavoriteList(song);
            }
        },
        getFavoriteIcon(song) {
            if (this.isFavorite(song)) {
                return 'icon-favorite';
            }
            return 'icon-not-favorite';
        },
        isFavorite(song) {
            const index = this.favoriteList.findIndex((item) => {
                return item.id === song.id;
            });
            return index > -1;
        },
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList'
        ])
    }
};

