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
axios.defaults.baseURL = 'http://liangwei.tech:3000'

// 过滤器
Vue.filter('fixImgUrl', (oldUrl) => {
  if (oldUrl.indexOf("http") == -1) {
    return axios.defaults.baseURL + oldUrl
  } else {
    return oldUrl
  }
})

axios.interceptors.request.use(config => {
  console.log("路过请求响应器");
  if (!config.headers.Authorization && localStorage.getItem("token")) {
    config.headers.Authorization = localStorage.getItem("token")
  }
  return config
});
Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')