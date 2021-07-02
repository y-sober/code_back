import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from '@/util/request'
console.log("-> axios", axios)
Vue.config.productionTip = false
import {API} from '@/util/api'
Vue.prototype.$api = new API(axios)
// console.log("-> API",new API(axios))
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
