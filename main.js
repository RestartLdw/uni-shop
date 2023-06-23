import App from './App'
import store from '@/store/store.js'

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
    
    // console.log(options)
    // console.log(store)
    if (options.url.indexof('/my/') !== -1) {
        options.header = {
            Authorization: store.state.m_user.mock_token
        }
    }
    
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
  ...App,
  store // 配置store的vuex
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  // app.use(store)
  return {
    app
  }
}
// #endif

