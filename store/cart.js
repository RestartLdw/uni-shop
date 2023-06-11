export default {
    // 为当前模块开启namespace
    namespaced: true,
    
    // 模块的state数据
    state: () => ({
        // 购物车数据用来存放购物车信息
        // 每个item对象包含 {goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state}
        cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
    }),
    
    // 模块的mutations方法
    mutations: {
        // state的数据只能通过mutations的方法修改
        addToCart(state, goods) {
            // 如果不存在findResult为undefined,否则为找到的商品信息对象
            const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
            console.log(findResult)
            if (!findResult) {
                state.cart.push(goods)
            } else {
                findResult.goods_count++
            }
            
            // 通过commit调用m_cart命名空间下的saveToStorageSync
            this.commit('m_cart/saveToStorage')
        },
        // 将购物车中数据持久化到本地
        saveToStorage(state) {
            uni.setStorageSync('cart', JSON.stringify(state.cart))
        },
        //更新购物车状态
        updateGoodsState(state, goods) {
            // 如果不存在findResult为undefined,否则为找到的商品信息对象
            const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
            if (findResult) {
                findResult.goods_state = goods.goods_state
                // 通过commit调用m_cart命名空间下的saveToStorageSync
                this.commit('m_cart/saveToStorage')
            }

        },
        
        // 更新商品数量
        updateGoodsCount(state, goods) {
            // 如果不存在findResult为undefined,否则为找到的商品信息对象
            const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
            if (findResult) {
                findResult.goods_count = goods.goods_count
                // 通过commit调用m_cart命名空间下的saveToStorageSync
                this.commit('m_cart/saveToStorage')
            }
        },
        
        // 删除商品
        deleteGoods(state, goods_id) {
            state.cart = state.cart.filter(x => x.goods_id != goods_id)
            this.commit('m_cart/saveToStorage')
        },
        
        changeAllGoodsState(state, newState) {
            console.log(newState)
            state.cart.forEach(goods => goods.goods_state = newState)
            this.commit('m_cart/saveToStorage')
        }
    },
    
    getters: {
        // 计算属性统计购物车数量
        total(state) {
            let c = 0;
            state.cart.forEach(goods => c += goods.goods_count)
            return c;
        },
        
        // 勾选结算数量
        checkedCount(state) {
            return state.cart.filter(goods => goods.goods_state)
                .reduce((total, goods) => total += goods.goods_count, 0)
        },
        
        checkedPrice(state) {
            console.log(state)
            return state.cart.filter(goods => goods.goods_state)
                .reduce((total, goods) => total += goods.goods_count * goods.goods_price, 0)
                .toFixed(2)
        }
    }, 
    
}