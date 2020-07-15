import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify);

Vue.config.productionTip = false
import Vant from 'vant'
import 'vant/lib/index.css';
Vue.use(Vant);
import api from '../Api/api.js'



Vue.prototype.api=api
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
