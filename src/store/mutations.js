import {
    RECEIVE_ADDRESS, RECEIVE_FOOD_TYPES, RECEIVE_SHOPS, RECEIVE_USERINFO, RECEIVE_INFO
    , DECREMENT_FOOD_COUNT, INCREMENT_FOOD_COUNT,
    RECEIVE_GOODS, RECEIVE_RATINGS
} from './mutation-types'
import Vue from 'vue'

export default {
    [RECEIVE_ADDRESS](state, {address}) {
        state.address = address
    },
    [RECEIVE_FOOD_TYPES](state, {foodTypes}) {
        state.foodTypes = foodTypes
    },
    [RECEIVE_SHOPS](state, {shops}) {
        state.shops = shops
    },
    [RECEIVE_USERINFO](state, {userInfo}) {
        state.userInfo = userInfo
    },
    [RECEIVE_INFO](state, {info}) {
        state.info = info
    },
    [RECEIVE_RATINGS](state, {ratings}) {
        state.ratings = ratings
    },
    [RECEIVE_GOODS](state, {goods}) {
        state.goods = goods
    },
    [DECREMENT_FOOD_COUNT](state, {food}) {
        if (!food.count) {
           Vue.set(food,'count',1)
        } else {
            food.count++
        }
    },
    [INCREMENT_FOOD_COUNT](state, {food}) {
        if(food.count){
            food.count--
        }
    }
}