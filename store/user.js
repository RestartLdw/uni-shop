export default {
    // 开启命名空间
    namespaced: true,
    
    // state数据
    state: () => ({
        //收获地址
        address: JSON.parse(uni.getStorageSync('address') || '{}'),
        token: uni.getStorageSync('token') || '',
        userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
        // 登陆成功后自动跳转 {openType, from}
        redictInfo: JSON.parse(uni.getStorageSync('redictInfo') || '{}'),
    }),
    
    //方法
    mutations: {
        updateAddress(state, address) {
            state.address = address
            this.commit('m_user/saveAddressToStorage')
        },
        
        saveAddressToStorage(state) {
            uni.setStorageSync('address', JSON.stringify(state.address))
        },
        
        updateUserInfo(state, userInfo) {
            state.userInfo = userInfo
            this.commit('m_user/saveUserInfoToStorage')
        },
        
        saveUserInfoToStorage(state) {
            uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
        },
        
        updateToken(state, token) {
            state.token = token
            this.commit('m_user/saveTokenToStorage')
        },
        saveTokenToStorage(state) {
            uni.setStorageSync('token', JSON.stringify(state.token))
        }, 
        
        updateRedictInfo(state, userInfo) {
            state.userInfo = userInfo
            this.commit('m_user/saveRedictInfoToStorage')
        },
        saveRedictInfoToStorage(state) {
            uni.setStorageSync('redictInfo', JSON.stringify(state.userInfo))
        },
        
    },
    
    getters: {
        addressDetail(state) {
            if (!state.address.provinceName) {
                return ''
            }
            return state.address.provinceName + state.address.cityName + state.address.detailInfo
        },
        
        getRedictInfo(state) {
            return state.redictInfo
        }  
        
    }
}