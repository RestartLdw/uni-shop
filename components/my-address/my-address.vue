<template>
    <view>
        <!-- 选择收获地址 -->
        <view class="address-choose-box" v-if="JSON.stringify(address) ==='{}'">
            <button type="primary" size="mini" class="address-btn" @click="onClickAddressHandler">请选择收获地址+</button>
        </view>
        
        <!-- 收货信息详情 -->
        <view class="address-info-box"  @click="onClickAddressHandler" v-else>
            <view class="name-phone-info">
                <view class="name-phone-text">
                    <view class="name">{{address.userName}}</view>
                    <view class="phone">{{address.telNumber}}</view>
                </view>
                <uni-icons type="right"></uni-icons>
            </view>
            <text class="address-info">{{addressDetail}}</text>
        </view>
    </view>
</template>

<script>
    import {mapState, mapMutations, mapGetters} from 'vuex'
    
    export default {
        name:"my-address",
        data() {
            return {
            };
        },
        methods: {
            ...mapMutations('m_user', ['updateAddress']),
            
            async onClickAddressHandler() {
                //1. 调用小程序提供的chooseAddress api,可选择收货地址功能
                // 返回数组，第一项为错误对象(null为没有错), 第二项成功之后的收货地址对象
                const res = await uni.chooseAddress().catch(err => err)
                if (res.errMsg === "chooseAddress:ok") {
                    console.log(res)
                    this.updateAddress(res)
                }
                if (res.errMsg === "chooseAddress:fail auth deny") {
                    this.reAuth()
                }
            }, 
            
            // https://www.bilibili.com/video/BV1834y1676P?p=162&spm_id_from=pageDriver&vd_source=56e33921468362de56508ae388c0fcc4
            async reAuth()  {
                console.log("需要重新授权")
                await uni.shoModel({
                    content: "检测到你没有打开地址权限，是否重新授权",
                    conformText: "确认",
                    cancelText: "取消"
                })
            }
        },
        computed: {
            ...mapState('m_user', ['address']),
            ...mapGetters('m_user', ['addressDetail'])
        },
    }
</script>

<style lang="scss">
.address-choose-box {
    height: 150rpx;
    width: 750rpx;
    display: flex;
    // align-items: center;
    // justify-content: space-between;
    
    justify-content: space-around;
    align-items: center;
    
    .address-btn {
        height: 30px;
    }
}

.address-info-box {
    height: 150rpx;
    width: 750rpx;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    margin-left: 5px;
    margin-right: 5px;
    
        
    .name-phone-info {
        display: flex;
        justify-content: space-between;
        margin-left: 5px;
        margin-right: 5px;
        
        
        .name-phone-text {
            display: flex;
        
            .name {
                margin-right: 5px;
                margin-bottom: 5px;
                font-size: 14px;
            }
            .phone {
                font-size: 14px;
            }
        }
    }
    .address-info {
        font-size: 14px;
    }
    
    
}
</style>