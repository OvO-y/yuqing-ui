import { createRouter, createWebHistory } from 'vue-router'
import HotSpot from '@/views/HotSpot.vue'
import DataMonitor from '@/views/DataMonitor.vue'
import EventAnalysis from '@/views/EventAnalysis.vue'
import FullTextSearch from '@/views/FullTextSearch.vue'
import MonitorAnalysis from '@/views/MonitorAnalysis.vue'
import MonitorAndManage from '@/views/MonitorAndManage.vue'
import MonitorScreen from '@/views/MonitorScreen.vue'
import UserEditor from '@/views/UserEditor.vue'

const routes = [
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
