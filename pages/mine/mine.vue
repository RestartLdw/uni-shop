<template>
    <view class="my-container">
        <my-login v-if="!token"></my-login>
        <my-userinfo v-else></my-userinfo>
    </view>
</template>

<script>
    import badageMix from '@/mixins/tabbar-badage.js'
    import { mapState } from 'vuex'
    
    export default {
        mixins: [badageMix],
        
        data() {
            return {
                
            };
        },
        
        computed: {
            ...mapState('m_user', ['token']),
        }
    }
</script>

<style lang="scss">
page, .my-container {
    height: 100%;
}
</style>
