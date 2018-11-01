import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'views/recommend'
import Rank from 'views/rank'
import Singer from 'views/singer'
import Search from 'views/search'
import SingerDetail from 'views/singerDetail'

Vue.use(Router);

export default new Router({
  linkActiveClass:'active',
  routes: [
    {
          path: '/',
          redirect: 'recommend',
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
        path: '/singer',
        name: 'singer',
        component: Singer,
        children:[
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
        component: Rank
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    }
  ]
})
