import { createRouter, createWebHistory } from 'vue-router'
import routes from './pages'
import store from '@/store'

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    base: process.env.VUE_APP_PUBLICPATH,
    routes,
    linkActiveClass: 'active'
})

const whiteList = ['/login', '/TreatmentTable', '/index']

router.beforeEach(async (to, from, next) => {
    const user = store.state.user
    if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        return next()
    } else {
        if (!user.accessToken) {
            store.commit('user/USER_INFO_LOGINOUT')
            next('/login')
        } else {
            // 有token
            if (to.path === '/login') {
                next({ path: '/' })
            } else {
                if (!user.login) {
                    await store.dispatch('user/GetUserInfo')
                    await router.addRoute(user.routers)
                    next({
                        ...to,
                        replace: true
                    }) // hack方法 确保addRoute已完成
                } else {
                    return next()
                }
            }
        }
    }
})

router.afterEach((to) => {
    if (to.matched.length > 0) {
        if (to.path !== '/login') store.commit('view/SET_BREADCRUMB_DATA', to)
    } else {
        router.push({ path: '/noPage/404' })
    }
    // store.commit('ivew/SET_RUNTIME_CLEAR')
})

export default router
