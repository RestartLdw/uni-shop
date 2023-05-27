<template>
    <view class="scroll-view-container">
        <!-- 左侧滑动区域 -->
        <scroll-view class="left-scorll-view" scroll-y="true" :style="{height: windowHeight + 'px'}">
            
            <view v-for="(item, i) in cateList" :key="i" :class="['left-scroll-view-item',  i === active? 'active': '']" @click="activeChanged(i)">
                {{item.cat_name}}
            </view> 
        </scroll-view>
        <!-- 右侧滑动区域 -->
        <scroll-view class="right-scroll-view" scroll-y="true" :scroll-top="scrollTop" :style="{height: windowHeight + 'px'}">
            <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
                <view class="cate-lv2-title">/{{item2.cat_name}}/</view>
                <view class="cate-lv3-list">
                    <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
                        <image :src="item3.cat_icon"></image>
                        <text>{{item3.cat_name}}</text>
                    </view>
                    
                </view>
            </view>
            
        </scroll-view>
        
        <!-- <view v-for="(item, i) in navList" :key="i">
            <image :src="item."
        </view> -->
    </view>
</template>

<script>
    import { $http } from '@escook/request-miniprogram';
    export default {
        data() {
            return {
                windowHeight: 0, //当前设备屏幕可用高度
                cateList: [],
                active: 0, //激活项
                cateLevel2: [],
                scrollTop: 0, //下滑条始入位置
                
            };
        },
        onLoad() {
            const sysInfo = uni.getSystemInfoSync()
            // console.log(sysInfo)
            this.windowHeight = sysInfo.windowHeight
            
            this.getCateList()
            
        },
        methods: {
            async getCateList() {
                const {data: res} = await uni.$http.get("/api/public/v1/categories")
                if (res.meta.status != 200) {
                    return uni.$showMsg()
                }
                this.cateList = res.message
                this.cateLevel2 = res.message[0].children
            },
            activeChanged(index) {
                this.active = index
                this.cateLevel2 = this.cateList[index].children
                this.scrollTop = this.scrollTop === 0? 1: 0
            },
            gotoGoodsList(item) {
                uni.navigateTo({
                    url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
                })
            }
        }
    }
</script>

<style lang="scss">
    .scroll-view-container {
        display: flex;
        .left-scorll-view {
            width: 120px;
            .left-scroll-view-item {
                background-color: #f7f7f7;
                line-height: 60px;
                text-align: center;
                font-size: 12px;
                
                &.active {
                    background-color: #ffffff;
                    position: relative;
                    
                    
                    &::before {
                        content: '';
                        display: block;
                        width: 3px;
                        height: 30px;
                        background-color: #C00000;
                        position: absolute;
                        top: 25%;
                        left: 0;
                        
                    }
                }
            }
        }
        .right-scroll-view {
            .cate-lv2 {
                .cate-lv2-title {
                    font-size: 12px;
                    font-weight: bold;
                    text-align: center;
                    padding: 15px 0;
                }
                .cate-lv3-list {
                    display: flex;
                    flex-wrap: wrap;
                    .cate-lv3-item {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 10px;
                        width: 33.33%;
                        image {
                            width: 60px;
                            height: 60px;
                        }
                        text {
                            font-size: 12px;
                            
                        }
                    }
                }
            }
            
        }
    }
    
</style>
