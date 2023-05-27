import App from './App'

// 导入网络请求包
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
uni.$showMsg = function(title='request fail', duration=1500) {
    return uni.showToast({
        icon:'none',
        title: title,
        duration: duration
    })
}
$http.baseUrl = "https://api-hmugo-web.itheima.net"
$http.beforeRequest = function(options) {
    uni.showLoading({
        title: '数据加载中...'
    })
}
$http.afterRequest = function() {
    uni.hideLoading()
}

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

