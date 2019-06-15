<template>
    <section class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
            <router-link class="header_search" slot="left" to="/search">
                <i class="iconfont iconsousuo"></i>
            </router-link>
            <router-link class="header_login" slot="right" :to="userInfo._id?'userinfo':'/login'">
                <span class="header_login_text">{{ userInfo._id?'个人中心':'登录|注册' }}</span>
            </router-link>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in foodTypesArr" :key="index">
                        <a :href="it.link" class="link_to_food" v-for="(it,index) in item" :key="index">
                            <div class="food_container">
                                <img :src="baseImageUrl+it.image_url">
                            </div>
                            <span>{{ it.title }}</span>
                        </a>
                    </div>
                </div>
                <!-- Add Pagination -->
                <div class="swiper-pagination"></div>
            </div>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
            <div class="shop_header">
                <i class="iconfont icon-xuanxiang"></i>
                <span class="shop_header_title">附近商家</span>
            </div>
            <ShopList></ShopList>
        </div>
    </section>
</template>

<script>
    import HeaderTop from '../../components/headerTop/HeaderTop'
    import 'swiper/dist/css/swiper.min.css'
    import Swiper from 'swiper'
    import ShopList from '../../components/shopList/ShopList'
    import {mapState} from 'vuex'

    export default {
        name: "MSite",
        components: {
            HeaderTop,
            ShopList
        },
        data() {
            return {
                baseImageUrl: 'https://fuss10.elemecdn.com'
            }
        },
        computed: {
            ...mapState(['address', 'foodTypes', 'userInfo']),
            foodTypesArr() {
                const {foodTypes} = this
                let arr = []
                let minArr = []
                for (let i = 0; i < foodTypes.length; i++) {
                    if (minArr.length === 8) {
                        minArr = []
                    }
                    if (minArr.length === 0) {
                        arr.push(minArr)
                    }
                    minArr.push(foodTypes[i])
                }
                return arr
            }
        },
        mounted() {
            this.$store.dispatch('getAddress')
            this.$store.dispatch('getFoodTypes')
            this.$store.dispatch('getShops')
        },
        watch: {
            foodTypes() {
                this.$nextTick(() => {  //一旦界面完全更新调用
                    new Swiper('.swiper-container', {
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination'
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl";
    .msite //首页
        width 100%

        .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff

            .swiper-container
                width 100%
                height 100%

                .swiper-wrapper
                    width 100%
                    height 100%

                    .swiper-slide
                        display flex
                        justify-content center
                        align-items flex-start
                        flex-wrap wrap

                        .link_to_food
                            width 25%

                            .food_container
                                display block
                                width 100%
                                text-align center
                                padding-bottom 10px
                                font-size 0

                                img
                                    display inline-block
                                    width 50px
                                    height 50px

                            span
                                display block
                                width 100%
                                text-align center
                                font-size 13px
                                color #666

                .swiper-pagination
                    > span.swiper-pagination-bullet-active
                        background #02a774

        .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff

            .shop_header
                padding 10px 10px 0

                .shop_icon
                    margin-left 5px
                    color #999

                .shop_header_title
                    color #999
                    font-size 14px
                    line-height 20px
</style>