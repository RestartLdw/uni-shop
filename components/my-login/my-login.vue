<template>
    <view class="user-login-container">
        <!-- 未登陆头像 -->
        <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
        <!-- 登陆button -->
        <button type="primary" class="btn-login" @click="getUserInfo">一键登录</button>
        <!-- 登陆提示信息 -->
        <text class="login-hint">登陆后尽享更多权益</text>
    </view>
</template>

<script>
    import { mapMutations, mapState, mapGetters } from 'vuex'
    
    export default {
        name:"my-login",
        data() {
            return {
                
            };
        },
        computed: {
            ...mapGetters('m_user', ['getRedictInfo']),
        },
        methods: {
            ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedictInfo']),
            
            async getUserInfo() {
                const res = await uni.getUserProfile({desc: '请求用户头像'}).catch(err => err)
                console.log(res)
                this.updateUserInfo(res.userInfo)
                this.getToken(res)
            },
                
            async getToken(detail) {
                const res = await uni.login().catch(err => err)
                if (res.errMsg !== "login:ok") {
                    return uni.$showError('登录失败!')
                }
                
                const query = {
                    code: res.code,
                    encryptedData: detail.encryptedData,
                    rawData: detail.rawData,
                    iv: detail.iv,
                    signature: detail.signature
                }    
                console.log(query)
                
                const {data: loginRes} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
                console.log(loginRes)
                // if (loginRes.meta.status != 200) {
                //     return uni.$showMsg('登录失败')
                // } 
                this.updateToken('mock_token')
                
                // 成功登陆后，回退
                this.navigateBack()
            },
            
            navigateBack() {
                console.log(this.getRedictInfo)
                if (this.getRedictInfo.openType === 'switchTab') {
                    uni.switchTab({
                        url: this.getRedictInfo.from,
                        complete: () => {
                            this.updateRedictInfo({})
                        }
                    })
                }
            }
        } 
    }
</script> 

<style lang="scss">
.user-login-container {
    display: flex;
    flex-direction: column;
    height: 750rpx;
    // width: 750rpx;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;
    
    &::after {
        content: ' ';
        width: 100%;
        height: 40px;
        background-color: white;
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 100%;
        
        transform: translateY(50%);
        
    }
    
    .contact-filled {
        height: 70%;
        width: 70%
    }
    
    .btn-login {
        width: 90%;
        border-radius: 100px;
        margin: 15px 0;
        background-color: #009d48
    }
    
    .login-hint {
        font-size: 12px;
        color: #7f7f7f
    }
    
}

</style>