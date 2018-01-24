// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import util from './util'
Vue.use(util);


//引入axios
import axios from './http.js'
Vue.prototype.$http = axios;

import VueCookie from 'vue-cookie'
Vue.use(VueCookie);


//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex);
import store from './store/index.js'


import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css';
Vue.use(ElementUI)

import VueEllipsis from 'vue-ellipsis'
Vue.use(VueEllipsis)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
