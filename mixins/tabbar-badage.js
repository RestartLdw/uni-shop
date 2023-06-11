import { mapGetters } from "vuex"

export default {
    // 把store中的total映射到cart.vue中
    computed: {
        ...mapGetters('m_cart', ['total'])
    },
    watch: {
        total() {
            this.setBadge()
        }
    },
    methods: {
        setBadge() {
            uni.setTabBarBadge({
                index: 2,
                text: this.total + '' //text值必须是字符串，而不是数字
            })
        }
    },
     
    onShow() {
        //页面显示的时候设置数字徽标
        this.setBadge()
    }
    
}
