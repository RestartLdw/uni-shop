<template>
    <view>
        <view class="goods-item">
            <view class="left-goods-box">
                <image :src="goods.goods_small_logo || defaultPic" class="goods-image" ></image>
            </view>
            
            <view class="right-goods-box">
                <view class="goods-name">{{goods.goods_name}}</view>
                <view class="goods-info">
                    
                    <view class="goods-price">￥{{goods.goods_price | fixMoney}}</view>
                    <view class="goods-cart" @click="addToCart(goods.goods_id)">
                        <view v-if="!goods.addToCartNum">
                            <uni-icons type="cart" size="24" color="#c00000"></uni-icons>
                        </view>
                        <view v-else>
                            <uni-icons type="cart-filled" size="24" color="#c00000"></uni-icons>
                        </view>
                    </view>
                    
                </view>
            </view>  
        </view>
    </view>
</template>

<script>
    export default {
        name:"my-goods",
        //props 接收外界信息
        props: {
            goods: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                defaultPic: "http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000606013705_1_400x400.jpg"    
            };
        },
            
        filters: {
            fixMoney(num) {
                return Number(num).toFixed(2)
            }
        }
        
    }
</script>

<style lang="scss">
.goods-item {
        display: flex;
        border-bottom: 1px solid #efefef;
        
        .left-goods-box {
            margin: 5px;
            .goods-image {
                width: 100px;
                height: 100px;
                display: block; //防止图片下面间隙
            }
        }
        .right-goods-box {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 600px;
            
            .goods-name {
                font-size: 14px;
                padding-top: 15px;
                color: #2d3a42;
                justify-content: center;
                align-items: center;
            }
            .goods-info {
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                color: #c00000;
                padding-bottom: 15px;
            }
        }
    }
</style>