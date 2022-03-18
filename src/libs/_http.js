import axios from 'axios'
import _api from './_api'
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const _http = axios.create({
    baseURL: _api.apiurl,
    timeout: 30000,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// HTTPrequest拦截
_http.interceptors.request.use(config => {
    const method = config.method
    NProgress.start()
    // 设置token
    const authorization = store.state.user.accessToken
    if (authorization) {
        config.headers['X-Access-Token'] = authorization
    }
    if (method === 'get') {
        config.params = Object.assign({}, config.params, {
            column: 'createTime',
            order: 'desc'
        })
    }
    return config
}, error => {
    return Promise.reject(error)
})

const goLogin = () => {
    ElMessageBox.confirm('登录过期，请重新登录！', '重新登录', {
        distinguishCancelAndClose: true,
        confirmButtonText: '重新登录',
        cancelButtonText: '取消'
    }).then(() => {
        store.commit('USER_INFO_LOGINOUT')
        // const pathname = window.location.pathname.substr(1);
        // window.location.href = `/login?${pathname}`;
        window.location.href = process.env.VUE_APP_PUBLICPATH + 'login'
    })
}

const errMsg = (error) => {
    const data = error.response.data
    const token = store.state.user.accessToken
    NProgress.done()
    switch (error.response.status) {
        case 403:
            ElMessage.error('拒绝访问')
            break
        case 500:
            if (token && data.message && data.message.includes('Token失效')) {
                goLogin()
            }
            break
        case 404:
            ElMessage.error('很抱歉，资源未找到!')
            break
        case 504:
            ElMessage.error('网络超时!')
            break
        case 401:
            goLogin()
            break
        default:
            ElMessage.error(data.message || '网络错误！')
    }
    return Promise.reject(data)
}

const messageWhite = [_api.login]

// HTTPresponse拦截
_http.interceptors.response.use(response => {
    NProgress.done()
    const code = response.data.code
    const method = response.config.method
    const url = response.config.url
    if (code !== 0 && code !== 200) {
        ElMessage.error(response.data.message)
        return Promise.reject(response.data.message)
    }
    if (method !== 'get' && !messageWhite.includes(url)) ElMessage.success('操作成功！')
    return response.data.result !== undefined ? response.data.result : response.data
}, errMsg)

export default _http
