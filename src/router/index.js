import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/msite'
        },
        {
            path: '/msite',
            component: () => import('../views/mSite/MSite'),
            meta: {
                showFooter: true
            }
        },
        {
            path: '/profile',
            component: () => import('../views/profile/Profile'),
            meta: {
                showFooter: true
            }
        },
        {
            path: '/search',
            component: () => import('../views/search/Search'),
            meta: {
                showFooter: true
            }
        },
        {
            path: '/order',
            component: () => import('../views/order/Order'),
            meta: {
                showFooter: true
            }
        },
        {
            path: '/login',
            component: () => import('../views/login/Login')
        },
        {
            path: '/shop',
            component: () => import('../views/shop/Shop'),
            children: [
                {
                    path: '',
                    redirect:'/shop/goods'
                },
                {
                    path: '/shop/goods',
                    component: () => import('../views/shop/shopGoods/ShopGoods')
                },
                {
                    path: '/shop/info',
                    component: () => import('../views/shop/shopInfo/ShopInfo')
                },
                {
                    path: '/shop/ratings',
                    component: () => import('../views/shop/shopRating/ShopRating')
                }
            ]
        },
    ]
})