<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li class="menu-item" @click="clickMenuItem(index)" :class="{current:currentIndex==index}" v-for="(item,index) in goods" :key="index">
                        <span class="text bottom-border-1px">
                                <img class="icon" :src="item.icon" v-if="item.icon">
                                {{ item.name }}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodsWrapper">
                <ul>
                    <li class="food-list food-list-hook" v-for="(item,index) in goods" :key="index">
                        <h1 class="title">{{ item.name }}</h1>
                        <ul>
                            <li class="food-item bottom-border-1px" @click="showFood(it)" v-for="(it,index) in item.foods" :key="index">
                                <div class="icon">
                                    <img width="57" height="57"
                                         :src="it.icon">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{ it.name }}</h2>
                                    <p class="desc">{{ it.description }}</p>
                                    <div class="extra">
                                        <span class="count">月售 {{ it.sellCount }} 份</span>
                                        <span>好评率 {{ it.rating }}</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{ it.price }}</span>
                                        <span class="old" v-if="it.oldPrice">￥{{ it.oldPrice }}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <CartControl :food="it"></CartControl>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <ShopCart></ShopCart>
        </div>
        <Food :food="food" ref="foodCom"></Food>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import BScroll from '@better-scroll/core'
    import CartControl from '../../../components/cartControl/CartControl'
    import Food from '../../../components/food/Food'
    import ShopCart from '../../../components/shopCart/ShopCart'
    export default {
        name: "ShopGoods",
        data() {
            return {
                scroll: 0,
                tops: [],
                food:null
            }
        },
        components:{
            CartControl,
            Food,
            ShopCart
        },
        methods:{
            clickMenuItem(index){
                const y = this.tops[index]
                this.scroll = y
                this.scrollFoods.scrollTo(0,-y,300)
            },
            showFood(it){
                this.food = it
                this.$refs.foodCom.toggleShow()
            }
        },
        mounted() {
            this.$store.dispatch('getShopGoods', () => {
                this.$nextTick(() => {
                    new BScroll('.menu-wrapper',{
                        click:true
                    })
                     this.scrollFoods = new BScroll('.foods-wrapper', {
                        probeType: 3,
                        click:true
                    })
                    this.scrollFoods.on('scroll', ({y}) => {
                        this.scroll = Math.abs(y)
                    })
                })
                let lis = document.querySelectorAll('.food-list')
                let total = 0
                this.tops.push(total)
                Array.from(lis).forEach(item => {
                    total += item.clientHeight
                    this.tops.push(total)
                })
            })
        },
        computed: {
            ...mapState(['goods']),
            currentIndex() {
                const {scroll, tops} = this
                let index = tops.findIndex((item,index) => (scroll >= item && scroll < tops[index + 1]))
                return index
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../../common/stylus/mixins.styl"
    .goods
        display: flex
        position: absolute
        top: 195px
        bottom: 46px
        width: 100%
        background: #fff;
        overflow: hidden

        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7

            .menu-item
                display: table
                height: 54px
                width: 56px
                padding: 0 12px
                line-height: 14px

                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    color: $green
                    font-weight: 700

                    .text
                        border-none()

                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat

                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    bottom-border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 12px

        .foods-wrapper
            flex: 1

            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7

            .food-item
                display: flex
                margin: 18px
                padding-bottom: 18px
                bottom-border-1px(rgba(7, 17, 27, 0.1))

                &:last-child
                    border-none()
                    margin-bottom: 0

                .icon
                    flex: 0 0 57px
                    margin-right: 10px

                .content
                    flex: 1

                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)

                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)

                    .desc
                        line-height: 12px
                        margin-bottom: 8px

                    .extra
                        .count
                            margin-right: 12px

                    .price
                        font-weight: 700
                        line-height: 24px

                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)

                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)

                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px
</style>