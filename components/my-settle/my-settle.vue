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
        <view class="settle-btn">结算({{checkedCount}})</view>
    </view>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    
    export default {
        name:"my-settle",
        data() {
            return {
                
            };
        },
        computed: {
            ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedPrice']),
            
            // 是否全选
            isFullCheck() {
                return this.checkedCount === this.total
            },
            
            
        },
        
        methods: {
            ...mapMutations('m_cart', ['changeAllGoodsState']),
            
            radioStateChange() {
                console.log("radioStateChange...beging")
                this.changeAllGoodsState(!this.isFullCheck)
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