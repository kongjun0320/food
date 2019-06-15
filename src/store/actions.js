import {RECEIVE_ADDRESS, RECEIVE_FOOD_TYPES, RECEIVE_SHOPS, RECEIVE_USERINFO
    ,RECEIVE_RATINGS,RECEIVE_GOODS,RECEIVE_INFO,DECREMENT_FOOD_COUNT,INCREMENT_FOOD_COUNT
} from './mutation-types'
import {reqAddress, reqFoodType, reqShops, reqUserInfo,reqShopInfo,reqShopRatings,reqShopGoods} from '../api'

export default {
    async getAddress({commit, state}) {
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        if (result.code === 0) {
            const address = result.data
            commit(RECEIVE_ADDRESS, {address})
        }
    },
    async getFoodTypes({commit}) {
        const result = await reqFoodType()
        if (result.code === 0) {
            const foodTypes = result.data
            commit(RECEIVE_FOOD_TYPES, {foodTypes})
        }
    },
    async getShops({commit, state}) {
        const {latitude, longitude} = state
        const result = await reqShops({longitude, latitude})
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, {shops})
        }
    },
    recordUserInfo({commit}, userInfo) {
        commit(RECEIVE_USERINFO, {userInfo})
    },
    async getUserInfo({commit}) {
        const result = await reqUserInfo()
        if (result.code === 0) {
            const userInfo = result.data
            commit(RECEIVE_USERINFO, {userInfo})
        }
    },
    // 异步获取商家信息
    async getShopInfo({commit}) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            info.score = 3.5
            commit(RECEIVE_INFO, {info})
        }
    },
// 异步获取商家评价列表
    async getShopRatings({commit}) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, {ratings})
        }
    },
// 异步获取商家商品列表
    async getShopGoods({commit},callback) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, {goods})
// 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
            callback&&callback()
        }
    },
    incrementCount({commit},food){
        commit(INCREMENT_FOOD_COUNT,{food})
    },
    decrementCount({commit},food){
        commit(DECREMENT_FOOD_COUNT,{food})
    }
}