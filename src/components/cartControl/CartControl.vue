<template>
    <div class="cartcontrol">
        <div class="iconfont iconremove_circle_outlin" v-if="food.count" @click="handleCount(false)"></div>
        <div class="cart-count" v-if="food.count">{{ food.count }}</div>
        <div class="iconfont iconadd_c" @click="handleCount(true)"></div>
    </div>
</template>

<script>
    export default {
        name: "CartControl",
        props:{
            food:{
                type:Object
            }
        },
        methods:{
            handleCount(isAdd){
                if(isAdd){
                    this.$store.dispatch('incrementCount',this.food)
                }else{
                    this.$store.dispatch('decrementCount',this.food)
                }
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .cartcontrol
        font-size: 0
        .cart-decrease
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size: 24px
            color: rgb(0, 160, 220)

        .iconremove_circle_outlin
            display: inline-block
            padding 6px
            line-height 24px
            font-size 24px
            color $green
            &.move-enter-active, &.move-leave-active
                transition all .3s
            &.move-enter, &.move-leave-to
                opacity 0
                transform translateX(15px) rotate(180deg)
        .cart-count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-top: 6px
            line-height: 24px
            text-align: center
            font-size: 10px
            color: rgb(147, 153, 159)
        .iconadd_c
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size: 24px
            color $green
</style>