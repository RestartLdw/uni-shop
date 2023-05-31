<template>
    <view>
        <view class="goods-list">
            <navigator v-for="(item, i) in goodsList" :key="i" :url="'/subpkg/goods_detail/goods_detail?good_id=' + item.goods_id">
                <my-goods :goods="item"></my-goods>
            </navigator> 
        </view>
        
    </view>
</template>

<script>
    export default {
        data() {
            return {
                queryObj: {
                    // 搜索词
                    query: '',
                    // 商品分类
                    cid: '',
                    pagenum: 1,
                    pagesize: 10
                },
                
                // 商品列表
                goodsList: [],
                // 商品列表总量
                total: 0,
                // 默认图片
                defaultPic: "http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000606013705_1_400x400.jpg",
                isLoading: false
            };
        },
        
        onLoad(options) {
            // 页面参数转存到queryObj
            console.log(options)
            this.queryObj.query = options.query || ''
            this.queryObj.cid = options.cid || ''
            this.getGoodsList()
        }, 
        
        //下拉刷新
        onPullDownRefresh() {
            this.queryObj.pagenum = 1
            this.total = 0
            this.goodsList = []
            this.isLoading = false
            this.getGoodsList(() => uni.stopPullDownRefresh())
        },
        
        //上拉触底刷新
        onReachBottom() {
            if (this.isLoading) {
                return
            }
            if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
                console.log("this.pagenum * this.pagesize >= this.total")
                return
            }
            this.queryObj.pagenum += 1
            
            this.getGoodsList()
        },
        
        methods: {
            
            async getGoodsList(cb) {
                
                this.isLoading = true
                const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
                if (res.meta.status != 200) {
                    return uni.$showMsg()
                }
                cb && cb()
                this.goodsList = [...this.goodsList, ...res.message.goods]
                
                this.total = res.message.total
                this.isLoading = false
            },
        }
    }
</script>

<style lang="scss">
.goods-list {
    margin: 0 5px 5px 5px;
}
</style>
