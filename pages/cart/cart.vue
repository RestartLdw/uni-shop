<template>
    <view class="cart-view">
        <!-- 收获地址组件 -->
        <my-address></my-address>
        <!-- 标题 -->
        <view class="cart-title">
            <uni-icons type="shop" size="20"></uni-icons>
            <text class="cart-title-text">购物车</text>
        </view>
        <!-- 购物车商品列表 -->
        <uni-swipe-action>
            <block class="cart-list" v-for="(item,index) in cart" :key="index">
                <uni-swipe-action-item :right-options="options" @click="swipeChangeHandler(item.goods_id)">
                    <my-goods :goods="item" :show-radio="true" @radio-change="radioChangeHandler" @number-change="numberChangeHandler"></my-goods>
                </uni-swipe-action-item>
            </block>
        </uni-swipe-action>
        
        <!-- 结算 -->
        <my-settle></my-settle>
    </view>
</template>

<script>
    import badageMix from '@/mixins/tabbar-badage.js'
    import { mapState, mapMutations } from "vuex"
    
    export default {
        mixins: [badageMix],
        computed: {
            ...mapState('m_cart', ['cart'])
        },
        data() {
            return {
                options: [
                    {
                        text: '删除',
                        style: {
                            backgroundColor: '#C00000'
                        }
                    }
                ],
                
            };
        }, 
        methods: {
            ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'deleteGoods']),
            
            radioChangeHandler(e) {
                this.updateGoodsState(e)
            },
            numberChangeHandler(e) {
                this.updateGoodsCount(e)
            },
            swipeChangeHandler(goods_id) {
                console.log(goods_id)
                this.deleteGoods(goods_id)
            }
        },
        
    }
</script>

<style lang="scss">
// .cart-view {
//     padding-bottom: 50px
// }
.cart-title {
    display: flex;
    align-items: center;
    padding: 5px;
    border: 1px solid #efefef;
    
    .cart-title-text {
        margin-left: 5px;
        font-size: 14px;
    }
}
    
.test {
    height: 100px;
}
</style>
