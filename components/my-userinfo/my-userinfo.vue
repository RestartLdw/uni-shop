<template>
    <view class="my-userinfo-container">
        <!-- 头像区域 -->
        <view class="top-box">
            <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
              <image class="avatar" :src="userInfo.avatarUrl"></image>
            </button> 
            <!-- <image :src="userInfo.avatarUrl" class="portrait-image" @click="changePortrainImg"></image> -->
            <view class="nick-name">LDW</view>
        </view>
        
        <view class="panel-list">
            <!-- 第一个面板 -->
            <view class="panel-item">
                <view class="panel-body">
                    <view class="panel-info">
                        <view class="collect-shop-num">8</view>
                        <view class="collect-shop-text">收藏的店铺</view>
                    </view>
                    <view class="panel-info">
                        <view class="collect-goods-num">8</view>
                        <view class="collect-goods-text">收藏的商品</view>
                    </view>
                    <view class="panel-info">
                        <view class="follow-goods-num">8</view>
                        <view class="follow-goods-text">关注的商品</view>
                    </view>
                    <view class="panel-info">
                        <view class="footprint-num">8</view>
                        <view class="footprint-text">足迹</view>
                    </view>
                </view>
            </view>
            
            <!-- 第二个面板 -->
            <view class="panel-item">
                
                <!-- title -->
                <view class="panel-title">我的订单</view>
                    
                <view class="panel-body">
                    <!-- 详情 -->
                    <view class="panel-info">
                        <uni-icons type="wallet" color="red" size="35"></uni-icons>
                        <view class="collect-shop-text">待付款</view>
                    </view>
                    <view class="panel-info">
                        <uni-icons type="shop" color="red" size="35"></uni-icons>
                        <view class="collect-goods-text">待收获</view>
                    </view>
                    <view class="panel-info">
                        <uni-icons type="refresh" color="red" size="35"></uni-icons>
                        <view class="follow-goods-text">退款/退货</view>
                    </view>
                    <view class="panel-info">
                        <uni-icons type="gift" color="red" size="35"></uni-icons>
                        <view class="footprint-text">全部订单</view>
                    </view>
                </view>
                
            </view>
            
            <!-- 第三个面板 -->
            <view class="panel-item">
                    
                <view class="panel-body2">
                    <!-- 详情 -->
                    <view class="panel-info2">
                        <view class="collect-shop-text">收获地址</view>
                        <uni-icons type="right"></uni-icons>
                    </view>
                    <button class="panel-info2-btn" open-type="contact">
                        <view class="collect-goods-text">联系客服</view>
                        <uni-icons type="right"></uni-icons>
                    </button>
                    <view class="panel-info2" @click="exit">
                        <view class="follow-goods-text">退出登陆</view>
                        <uni-icons type="right"></uni-icons>
                    </view>
                </view>
                
            </view>
            
        </view>
        
    </view>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    
    export default {
        name:"my-userinfo",
        data() {
            return {
                
                
            };
        },
        
        computed: {
            ...mapState('m_user', ['userInfo'])
        },
            
        methods: {
            ...mapMutations('m_user', ['updateUserInfo', 'updateToken']),
            
            onChooseAvatar(e) {
                console.log(e)
                const { avatarUrl } = e.detail
                this.userInfo.avatarUrl = avatarUrl
                this.updateUserInfo(this.userInfo)
            },
                
            async exit() {
                const res = await uni.showModal({
                    title: '提示',
                    content: '确定退出登陆吗？'
                }).catch(err => err)
                console.log(res)
                console.log('after confirm')
                if (res.confirm) {
                    console.log("退出登陆")
                    this.updateUserInfo({})
                    this.updateToken('')
                }
            }
        }
    }
</script>

<style lang="scss">

.my-userinfo-container{
    height: 100%;
    background-color: #efefef;
    
    .top-box {
        width: 100%;
        height: 400rpx;
        background-color: #009d48;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        .avatar-wrapper {
            height: 90px;
            width: 90px;
            border-radius: 45px;
            border: 2px solid white;
            box-shadow: 0 1px 5px black;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            
            .avatar {
                width: 90px; 
                height: 90px;        
            }
        }
        
        .nick-name {
            font-size: 16px;
            font-weight: bold;
            color: #FFF;
            margin-top: 10px;
        }
        
    }
   
    .panel-list {
        padding: 0 10px;
        position: relative;
        top: -10px;
        
        .panel-item {
            display: flex;
            flex-direction: column;
            background-color: #FFF;
            border-radius: 3px;
            margin-bottom: 8px;
            padding: 10px 4px;
            justify-content: space-between;
            
            .panel-title {
                border-bottom: 1px solid #efefef;
                font-size: 15px;
                padding-bottom: 10px;
            }
            
            .panel-body {
                padding-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                
                
                .panel-info {
                    display: flex;
                    flex-direction: column;  
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 13px;
                }
            }
            
            .panel-body2 {
                display: flex;
                flex-direction: column;
                justify-content: center;
                
                .panel-info2 {
                    display: flex;
                    justify-content: space-between;
                    font-size: 15px;
                    padding: 10px 0;
                }
                
                .panel-info2-btn {
                    background-color: white;
                    width: 100%;
                   
                    display: flex;
                    justify-content: space-between;
                    font-size: 15px;
                    padding: 10px 0;
                    &::after {
                        border: none;
                    }
                }
                // .panel-info2-btn::after {
                //     border: none;
                // }
            }
            
        }
        
        
    }
}



</style>