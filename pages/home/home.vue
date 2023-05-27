<template>
    <view>
        <!-- 轮播图区域 -->
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
            <swiper-item v-for="(item, i) in swiperList" :key="i">
                <navigator class="swiper-img" :url="'/subpkg/goods_detail/goods_detail?good_id=' + item.goods_id">
                    <image :src="item.image_src"></image>
                </navigator>
            </swiper-item>
        </swiper>
        <!-- 导航区域 -->
        <view class="nav-cates">
            <view  v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
                <image class="nav-image" :src="item.image_src"></image>
            </view>
        </view>
        <!-- 楼层数据 -->
        <view class="floor-list">
            <view class="floor-item" v-for="(item, i) in floorList" :key="i">
                <!-- 楼层title -->
                <view class="floor-item-title">
                    <image :src="item.floor_title.image_src"></image>
                </view>
                <view class="floor-item-products">
                    <!-- 楼层左侧图片 -->
                    <navigator class="left-floor-img" :url="item.product_list[0].url">
                        <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
                    </navigator>
                    
                    <view class="right-floor-img">
                        <navigator class="right-floor-item" :url="item2.url" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
                            <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
                        </navigator>
                    </view> 
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { $http } from '@escook/request-miniprogram';
    export default {
        data() {
            return {
                // 轮播图数组
                swiperList: [],
                navList: [],
                floorList: []
            };
        },
        methods: {
            async getSwiperList() {
                const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
                
                if (res.meta.status != 200) {
                    return uni.$showMsg()
                }
                this.swiperList = res.message
                // console.log(this.swiperList)
            },
            async getNavList() {
                const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
                if (res.meta.status != 200) {
                    return uni.$showMsg()
                }
                this.navList = res.message
            },
            async getFloorList() {
                const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
                if (res.meta.status != 200) {
                    return uni.$showMsg()
                }
                // console.log(res.message)
                res.message.forEach(floor => {
                    floor.product_list.forEach(floor_item => {
                        floor_item.url = '/subpkg/goods_list/goods_list?' + floor_item.navigator_url.split("?")[1]
                    })
                })
                this.floorList = res.message
                // console.log(this.floorList)
            },
            navClickHandler(item) {
                // console.log(item)
                if (item.name === "分类") {
                    uni.switchTab({
                        url: "/pages/cate/cate"
                    })
                }
            }
        },
        // 页面加载的时候调用获取轮播图数据
        onLoad() {
            this.getSwiperList()
            this.getNavList()
            this.getFloorList()
        }
    }
</script>

<style lang="scss">
swiper {
    height: 330rpx;
    
    .swiper-img,
    image {
        width: 100%;
        height: 100%;
    }
}

.nav-cates {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
}
.nav-image {
    width: 128rpx;
    height: 140rpx;
}
.floor-list {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 15px 0;

    .floor-item-title {
        height: 60rpx;
        image {
            height: 100%;
            width: 100%;
        }
    }
    
    .floor-item-products {
        display: flex;
        padding-left: 10px;
    }
    
    .right-floor-img {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
}
</style>
