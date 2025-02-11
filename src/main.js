import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 正确注册 ElementPlusIconsVue 组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册 Vuex 存储
app.use(store)
// 注册 Vue Router
app.use(router)
// 注册 ElementPlus 组件库
app.use(ElementPlus)
// 配置全局的 axios 实例
app.config.globalProperties.$axios = axios

app.mount('#app')
