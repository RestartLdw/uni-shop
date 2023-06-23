<template>
    <view class="my-settle-container">
        <!-- 全选 -->
        <view class="select-all">
            <label class="select-all-radio">
                <radio color="#00a049" :checked="isFullCheck" @click="radioStateChange"/><text>全选</text>
            </label>
        </view>
        
        <!-- 合计 -->
        <view class="all-fee">
            <view class="all-fee-title">合计</view>
            <view class="all-fee-price">￥{{checkedPrice}}</view>
        </view>
        
        <!-- 结算 -->
        <view class="settle-btn" @click="settlement">结算({{checkedCount}})</view>
    </view>
</template>

<script>
    import { mapGetters, mapMutations, mapState } from 'vuex'
    
    export default {
        name:"my-settle",
        data() {
            return {
                seconds: 3,
                timer: null //定时器id
            };
        },
        computed: {
            ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedPrice']),
            ...mapGetters('m_user', ['addressDetail']),
            ...mapState('m_user', ['token']),
            
            
            // 是否全选
            isFullCheck() {
                return this.checkedCount === this.total
            },
            
            
        },
        
        methods: {
            ...mapMutations('m_cart', ['changeAllGoodsState']),
            ...mapMutations('m_user', ['updateRedictInfo']),
            
            radioStateChange() {
                console.log("radioStateChage...beging")
                this.changeAllGoodsState(!this.isFullCheck)
            },
            
            settlement() {
                if (this.total <= 0) {
                    return uni.$showMsg("请添加商品到购物车！")
                }
                if (this.checkedCount <= 0) {
                    return uni.$showMsg("请选则要结算的商品！")
                }
                if (!this.addressDetail) {
                    return uni.$showMsg("请选择收获地址！")
                }
                if (!this.token) {
                    return this.delayAutoLogin()
                }
            },
            
            showTips(n) {
                return uni.showToast({
                    icon: 'none',
                    title: '请登陆后再结算!' + n + '秒后自动跳转到登陆页!',
                    mask: true,
                    duration: 1500
                })
            },
            
            delayAutoLogin() {
                this.seconds = 3
                this.showTips(this.seconds)
                this.timer = setInterval(() => {
                    console.log("this.seconds", this.seconds)
                    if (this.seconds <= 0) {
                        clearInterval(this.timer)
                        uni.switchTab({
                            url: '/pages/mine/mine',
                            success: () => {
                                this.updateRedictInfo({
                                    openType: 'switchTab',
                                    from: '/pages/cart/cart'
                                    
                                })
                            }
                        })
                        return 
                    }
                    this.seconds--
                    this.showTips(this.seconds)
                }, 1000)
            }
        }
    }
</script>

<style lang="scss">
    
.my-settle-container {
    font-size: 14px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 50px;
    padding: 0 5px;
    background-color: white;
    align-items: center;
    border-bottom: 1px solid #efefef;
    
    .select-all {
        align-items: center;
    }
    
    .all-fee{
        display: flex;
        .all-fee-price {
            color:  #c00000;
            font-weight: bold;
        }
    }
    
    .settle-btn {
        height: 100%;
        line-height: 50px;
        text-align: center;
        min-width: 100px;
        background-color: #c00000; 
        color: white;
        padding: 0 10px;
        text-align: center;
    }
}
</style>