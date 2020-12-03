import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 挂载axios到原型
Vue.prototype.$axios = axios
//设置默认的 api 域名基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')