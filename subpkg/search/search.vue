<template>
    <view>
        <view class="search-box">
            <uni-search-bar @confirm="search" @input="input" radius='18' focus='true' cancelButton='none'></uni-search-bar>
        </view>
        
        <view class="suggest-list" v-if="searchResults.length != 0">
            <uni-list>
                <uni-list-item v-for="(item, i) in searchResults" :key="i" link :to="'/subpkg/goods_detail/goods_detail?good_id=' + item.goods_id" :title="item.goods_name" ellipsis="1" ></uni-list-item>
            </uni-list>
        </view>
        <!-- <view class="suggest-list">
            <view class="suggest-item" v-for="(item, i) in searchResults" :key="i" @click="gotoGoodsDetail(item.goods_id)">
                <view class="goods-name">{{item.goods_name}}</view>
                <uni-icons type="right" size="18"></uni-icons>
            </view>
        </view> -->
        <view class="search-history" v-if="searchResults.length === 0">
            <view class="search-history-title">
                <text>搜索历史</text>
                <uni-icons type="trash" size="18" @click="clearSearchKeywords()"></uni-icons>
            </view>
            <view class="search-history-list">
                <uni-tag :text="item" inverted v-for="(item, i) in history" :key="i" @click="onClickHistory(item)"></uni-tag>
            </view>
        </view>
        
    </view>
</template>

<script>
    export default {
        data() {
            return {
                timer: null,
                query: '',
                searchResults: [],
                // 搜索历史
                searchKeywordList: [], 
            };
        },
            
        onLoad() {
            this.searchKeywordList = JSON.parse(uni.getStorageSync('search_keyword_history') || '[]')
        }, 
        methods: {
            // input输入事件处理函数
            input(e) {
                clearTimeout(this.timer)
                
                this.timer = setTimeout(() => {
                    this.query = e
                    this.getSearchResults()
                    this.saveSearchHistory()
                }, 500)
            },
            
            async getSearchResults() {
                if (this.query === '') {
                    this.searchResults = []
                    return
                }
                // const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch?query=' + this.query)
                const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', {query: this.query})
                if (res.meta.status != 200) {
                    return uni.$showMsg()
                }
                this.searchResults = res.message
                // console.log(this.searchResults)
            },
            
            // gotoGoodsDetail(e) {
            //     uni.navigateTo({
            //         url: '/subpkg/goods_detail/goods_detail?good_id=' + e
            //     })
            // }
                
            saveSearchHistory() {
                // this.searchKeywordList.push(this.query)
                
                const searchHistSet = new Set(this.searchKeywordList)
                searchHistSet.delete(this.query)
                searchHistSet.add(this.query)
                this.searchKeywordList = Array.from(searchHistSet)
                
                // 持久化存储到本地
                uni.setStorageSync('search_keyword_history', JSON.stringify(this.searchKeywordList))
            },
            
            clearSearchKeywords() {
                this.searchKeywordList = []
                uni.removeStorageSync('search_keyword_history')
            }
        },
        computed: {
            history() {
                return [...this.searchKeywordList].reverse()
            }
        }
    }
</script>

<style lang="scss">
.search-box {
    position: sticky;
    top: 0;
    z-index: 999;
}
// .suggest-list {
//     padding: 0 15px;
    
//     .suggest-item {
//         font-size: 14px;
//         padding: 13px 0;
//         border-bottom: 1px solid #efefef;
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
        
//         .goods-name {
//             // 文字不允许换行
//             white-space: nowrap;
//             // 溢出部分隐藏
//             overflow: hidden;
//             // 文字溢出部分用...替代
//             text-overflow: ellipsis;
//             margin-right: 3px;        
//         }
//     } 
// }

.search-history {
    padding: 0 5px;
    
    .search-history-title {
        display: flex;
        padding: 5px 0;
        justify-content: space-between;
        border-bottom: 1px solid #efefef;
        font-size: 13px;
    }
    
    .search-history-list {
        display: flex;
        flex-wrap: wrap;
        
        uni-tag {
            margin-top: 5px;
            margin-right: 5px;
        }
        
    }
}

</style>
