// 1. 导入Vue和Vuex
import Vue from 'vue'
import Vuex from 'vuex'
// a.导入购物车的vuex模块
import moduleCart from '@/store/cart.js' 
import moduleUser from '@/store/user.js'


// 2. 将Vuex安装为Vue的插件
Vue.use(Vuex)

// 3. 创建Vuex的实例对象
const store = new Vuex.Store({
    // todo 挂载store模块
    modules: {
        'm_cart': moduleCart,
        'm_user': moduleUser,
    }
})

// 4. 向外共享store的实例对象
export default store

// 5. 在main.js中导入store实例并挂载到Vue的实例上


 
