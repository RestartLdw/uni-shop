<template>
    <view>
        cate
    </view>
</template>

<script>
    import { $http } from '@escook/request-miniprogram';
    export default {
        data() {
            return {
                navList: [],
            };
        },
        onLoad() {
            this.getNavList()
        },
        methods: {
            async getNavList() {
                const {data: res} = await uni.$http.get("/api/public/v1/categories")
                if (res.meta.status != 200) {
                    return uni.$showMsg()
                }
                this.navList = res.message
                console.log(this.navList)
            }
        }
    }
</script>

<style lang="scss">

</style>
