// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Icon from 'vue2-svg-icon/Icon.vue'
import VueLazyLoadImg from 'vue-lazy-load-img'
import ElementUI from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import '@/static/css/animate.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import './common/css/iconfont.css'

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

Vue.component('icon', Icon)

Vue.use(VueLazyLoadImg)
Vue.use(ElementUI)

Vue.config.productionTip = false

// 页面切换显示loading
router.beforeEach((to, from, next) => {
  store.commit('updateLoadingStatus', { isLoading: true })
  next()
})
router.afterEach((to) => {
  store.commit('updateLoadingStatus', { isLoading: false })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
