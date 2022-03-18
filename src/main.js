import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import '@/styles/vab.scss'

import '@/utils/globUtils' // 初始化挂载的方法

import * as Icons from '@element-plus/icons-vue'
// 注册全局组件
import mgComponents from '@/components/common'
const app = createApp(App)
Object.keys(Icons).map(key => app.component(key, Icons[key]))

app.use(ElementPlus, { locale: zhCn, zIndex: 3000 })
app.use(mgComponents)
app.use(store).use(router).mount('#app')
