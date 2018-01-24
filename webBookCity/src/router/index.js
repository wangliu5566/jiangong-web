import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import zwx from "./ZWX/"
import details from "./Details/"
import lqr from "./LQR/"
import business from "./Business/"

export default new Router({
 // mode: 'history',
  routes: [{
    path: '/',
    redirect: '/wrap',
  },{
    path: '/wrap',
    component: resolve => require.ensure([], () => resolve(require('@/components/Wrap.vue')), 'bgSystem01'),
    children: [...zwx,...lqr,...details,...business]
  },{
    path: '/register',
     component: resolve => require(['@/components/login/Login'], resolve),
  },{
    path: '/login',
     component: resolve => require(['@/components/login/Register'], resolve),
  },{
    path: '/findpassword',
     component: resolve => require(['@/components/login/Findpassword'], resolve),
  }],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
