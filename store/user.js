export default {
    // 开启命名空间
    namespaced: true,
    
    // state数据
    state: () => ({
        //收获地址
        address: JSON.parse(uni.getStorageSync('address') || '{}')
    }),
    
    //方法
    mutations: {
        updateAddress(state, address) {
            state.address = address
            this.commit('m_user/saveAddressToStorage')
        },
        
        saveAddressToStorage(state) {
            uni.setStorageSync('address', JSON.stringify(state.address))
        }
        
    },
    
    getters: {
        addressDetail(state) {
            if (!state.address.provinceName) {
                return ''
            }
            return state.address.provinceName + state.address.cityName + state.address.detailInfo
        }
        
    }
}