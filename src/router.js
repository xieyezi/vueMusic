import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
const Recommend = () => import('views/recommend');
const Rank = () => import('views/rank');
const Singer = () => import('views/singer');
const Search = () => import('views/search');
const SingerDetail = () => import('views/singerDetail');
const Disc = () => import('views/disc');
const RankDetail = () => import('views/rankDetail');
const Menu = () => import('components/usermenu');
const Theme = () => import('components/theme');


export default new Router({
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            redirect: 'recommend',
        },
        {
            path: '/recommend',
            name: 'recommend',
            component: Recommend,
            children: [
                {
                    path:':id',
                    name:'disc',
                    component:Disc,
                }
            ]
        },
        {
            path: '/singer',
            name: 'singer',
            component: Singer,
            children: [
                {
                    path: '/singer/singerDetail',
                    name: 'singerDetail',
                    component: SingerDetail
                }
            ]
        },
        {
            path: '/rank',
            name: 'rank',
            component: Rank,
            children: [
                {
                    path:':id',
                    name:'rankDetail',
                    component:RankDetail,
                }
            ]
        },
        {
            path: '/search',
            name: 'search',
            component: Search
        },
        {
            path:'/menu',
            name:'menu',
            component:Menu
        },
        {
            path:'/theme',
            name:'theme',
            component:Theme
        }
    ]
})
