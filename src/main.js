import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import VueRouter from 'vue-router'
import router from '@/router'
import 'es6-promise/auto'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import utilities from '@/utilities'

utilities.importIcons()
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
