<template>
    <view v-if="goodsDetail.goods_name" class="goods-detail-name">
        <!-- 轮播图区域 -->
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
            <swiper-item v-for="(item, i) in goodsDetail.pics" :key="i">
                <view class="swiper-item">
                    <image :src="item.pics_big" @click="previewImg(i)"></image>
                </view>
            </swiper-item>
        </swiper>
        <!-- 商品价格 -->
        <view class="goods-price">￥{{goodsDetail.goods_price}}</view>
        <!-- 商品名称 -->
        <view class="goods-info">
            <view class="goods-name">{{goodsDetail.goods_name}}</view>
            <view class="collect-icon">
                <uni-icons type="star" size="18" color="#939393"></uni-icons>
                <view class="collect-text">收藏</view>
            </view> 
        </view>
        <!-- 快递免运费 -->
        <view class="delivery-info">快递：免运费</view>
        
        <rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
         
        <!-- 商品导航区 -->
        <view class="goods-nav">
            <uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick"
            				@buttonClick="buttonClick" />
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                goodsId: -1,
                goodsDetail: {},
                options: [
                  //       {
                		// 	icon: 'headphones',
                		// 	text: '客服'
                		// },
                    {
                        icon: 'shop',
                        text: '店铺',
                        // info: 2
                        // infoBackgroundColor:'#007aff',
                        // infoColor:"red"
                    }, {
                        icon: 'cart',
                        text: '购物车',
                        info: 2
                    }],
                    buttonGroup: [{
                      text: '加入购物车',
                      backgroundColor: '#ff0000',
                      color: '#fff'
                    },
                    {
                      text: '立即购买',
                      backgroundColor: '#ffa200',
                      color: '#fff'
                    }
                ]
            };
        },
        
        filters: {
            fixMoney(num) {
                return Number(num).toFixed(2)
            }
        },
        onLoad(option) {
            this.goodsId = option.goods_id
            this.getGoodsDetail()
        },
        methods: {
            async getGoodsDetail() {
                const {data: res} = await uni.$http.get('/api/public/v1/goods/detail', {'goods_id': this.goodsId})
                
                if (res.meta.status != 200) {
                    return uni.$showMsg()
                }
                this.goodsDetail = res.message
                this.goodsDetail.goods_introduce = this.goodsDetail.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(/webp/g, 'jpg')
                // console.log(this.goodsDetail.goods_introduce)
            },
            
            preview(i) {
                uni.previewImage({
                    current: i,
                    urls: this.goodsDetail.pics.map(x => x.pics_big)
                })
            }, 
            
            onClick (e) {
                if (e.content.text === '购物车') {
                    uni.switchTab({
                        url: '/pages/cart/cart'
                    })
                }
                
            },
            buttonClick (e) {
                if (e.con)
                console.log(e)
                this.options[1].info++
            }
            
        },
        
    }
</script>

<style lang="scss">
swiper {
    height: 750rpx;
    
    .swiper-item,
    image {
        width: 100%;
        height: 100%;
    }
}

.goods-price {
    font-size: 20px;
    // text-align: justify;
    color: #C00000;
    margin-top: 5px;
}

.goods-info {
    display: flex;
    justify-content: space-between;
    margin: 5px;
    // width: 750rpx;
    
    .goods-name {
        // width: 80%;
        font-size: 16px;
        margin-right: 5px;
        // text-align: justify;
        // vertical-align: center;
    }
    
    .collect-icon {
        margin-right: 0px;
        display: flex;
        flex-direction: column;
        justify-content: center; // 纵向居中
        align-items: center; //横向居中
        width: 120px;
        border-left: 1px solid #efefef ;

        .collect-text {
            font-size: 14px;
            color: #939393;
        }
    }
}

.delivery-info {
    font-size: 14px;
    color: #939393;
    margin-bottom: 10px;
}

    
.goods-nav {
    position: fixed;
    bottom: 0; //页面最底部
    left: 0;
    width: 100%;
}

.goods-detail-name {
    padding-bottom: 60px;
}
</style>
