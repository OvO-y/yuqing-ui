import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/LoginBox.vue'
import Register from '../views/RegisterBox.vue'
import test from '../views/test.vue'
import UserEditor from '@/views/UserEditor.vue'
import MonitorScreen from '@/views/MonitorScreen.vue'
import MonitorAndManage from '@/views/MonitorAndManage.vue'
import MonitorAnalysis from '@/views/MonitorAnalysis.vue'
import FullTextSearch from '@/views/FullTextSearch.vue'
import EventAnalysis from '@/views/EventAnalysis.vue'
import DataMonitor from '@/views/DataMonitor.vue'
import HotSpot from '@/views/HotSpot.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/hotSpot',
    name: 'hotSpot',
    component: HotSpot
  },
  {
    path: '/data-monitor',
    name: 'data-monitor',
    component: DataMonitor
  },
  {
    path: '/event-analysis',
    name: 'event-analysis',
    component: EventAnalysis
  },
  {
    path: '/fullText-search',
    name: 'fullText-search',
    component: FullTextSearch
  },
  {
    path: '/monitor-manage',
    name: 'monitor-manage',
    component: MonitorAndManage
  },
  {
    path: '/monitor-analysis',
    name: 'monitor-analysis',
    component: MonitorAnalysis
  },
  {
    path: '/monitor-screen',
    name: 'monitor-screen',
    component: MonitorScreen
  },
  {
    path: '/user-editor',
    name: 'userEditor',
    component: UserEditor
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
