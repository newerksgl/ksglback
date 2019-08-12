import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import request from './network/request'   //axios实例化后引入取名http
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.prototype.request = request
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
