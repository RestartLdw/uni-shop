<template>
   <view class="my-search-container" @click="onSearchBoxHandler" :style="{'background-color': bgcolor}">
        <view class="my-search-box" :style="{'border-radius': radius + 'px'}">
            <uni-icons type="search" size="18"></uni-icons>
            <text class="placeholder">搜索</text>
        </view>
    </view>
</template>

<script>
    export default {
        name:"my-search",
        props: {
            // 背景颜色
            bgcolor: {
                type: String,
                default: '#009d48'
            },
            // 圆角尺寸，单位 px
            radius: {
                tpye: Number,
                default: 18 
            }
        },
        data() {
            return {
                
            };
        },
        methods: {
            onSearchBoxHandler() {
                console.log("dagdag")
                this.$emit('myclick')
            }
        }
    }
</script>

<style lang="scss">
    .my-search-container {
        height: 50px;
        // background-color: #009d48;
        display: flex;
        align-items: center;
        padding: 0 10px;
        
        .my-search-box {
            height: 36px;
            width: 100%;
            background-color: #FFFFFF;
            // border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            .placeholder {
                font-size: 15px;
                // color: #cfcfcf;
                text-align: center;
                margin-left: 5px;
            }
        }
    }
</style>