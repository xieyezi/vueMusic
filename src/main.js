import './common/js/hack'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload'
import './plugins/iview.js'

fastclick.attach(document.body);
Vue.config.productionTip = false;
Vue.use(VueLazyload, {
    // loading: require('common/image/default.jpg')
    loading: 'https://cdn.xieyezi.com/default.jpg'
});

Vue.prototype.$axios= axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
