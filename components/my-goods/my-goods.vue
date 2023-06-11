<template>
    <view>
        <view class="goods-item">
            <view class="left-goods-box">
                <radio :checked="goods.goods_state" v-if="showRadio" @click="radioClickHandler"></radio>
                <image :src="goods.goods_small_logo || defaultPic" class="goods-image" ></image>
            </view>
            
            <view class="right-goods-box">
                <view class="goods-name">{{goods.goods_name}}</view>
                <view class="goods-info">
                    
                    <view class="goods-price">￥{{goods.goods_price | fixMoney}}</view>
                    
                    <view class="goods-price-num" v-if="showRadio">
                        <uni-number-box :min="1" :value="goods.goods_count" @change="numberChangeHandler"></uni-number-box>
                    </view>
                    
                    <view class="goods-cart" @click="addToCart(goods.goods_id)" v-else>
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
            },
            //是否展示radio
            showRadio: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            radioClickHandler() {
                this.$emit("radio-change", {
                    goods_id: this.goods.goods_id,
                    goods_state: !this.goods.goods_state,
                })
            },
            numberChangeHandler(val) {
                this.$emit("number-change", {
                    goods_id: this.goods.goods_id,
                    goods_count: +val //+表示数字
                })
            }
        },
        data() {
            return {
                defaultPic: "http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000606013705_1_400x400.jpg"    
            }
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
        border-bottom: 1px solid #f0f0f0;
        
        .left-goods-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 5px;
            .goods-image {
                width: 100px;
                height: 100px;
                display: block; //防止图片下面间隙
            }
        }
        .right-goods-box {
            display: flex;
            flex: 1; //沾满整个区域
            flex-direction: column;
            justify-content: space-between;
            // width: 600px;
            
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
                align-items: center;
                font-size: 16px;
                color: #c00000;
                padding-bottom: 15px;
            }
        }
    }
</style>