<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!--        <el-menu-->
        <!--          default-active="2"-->
        <!--          class="el-menu-vertical-demo"-->
        <!--          :collapse="isCollapse"-->
        <!--          @open="handleOpen"-->
        <!--          @close="handleClose"-->
        <!--        >-->
        <!--          &lt;!&ndash; 菜单项 &ndash;&gt;-->
        <!--        </el-menu>-->
        <menu-element></menu-element>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-container">
            <div class="toggle-button" @click="toggleCollapse">
              <el-icon v-if="!isCollapse">
                <Fold/>
              </el-icon>
              <el-icon v-else>
                <Expand/>
              </el-icon>
            </div>
            <el-tabs v-model="activeTab" type="border-card" @tab-click="handleTabClick">
              <el-tab-pane></el-tab-pane>
              <el-tab-pane name="todayHotspots" label="今日热点">
                <template #label>
                  <span class="tab-label"><el-icon><List/></el-icon>今日热点</span>
                </template>
              </el-tab-pane>
              <el-tab-pane name="monitorAnalysis" label="监测分析">
                <template #label>
                  <span class="tab-label"><el-icon><Aim/></el-icon>监测分析</span>
                </template>
              </el-tab-pane>
              <el-tab-pane name="dataMonitoring" label="数据监测">
                <template #label>
                  <span class="tab-label"><el-icon><Histogram/></el-icon> 数据监测</span>
                </template>
              </el-tab-pane>
              <el-tab-pane name="monitorManagement" label="监测管理">
                <template #label>
                  <span class="tab-label"><el-icon><Operation/></el-icon>监测管理</span>
                </template>
                监测管理
              </el-tab-pane>
              <el-tab-pane name="fullTextSearch" label="全文搜索">
                <template #label>
                  <span class="tab-label"><el-icon><Search/></el-icon>全文搜索</span>
                </template>
              </el-tab-pane>
              <el-tab-pane name="eventAnalysis" label="事件分析">
                <template #label>
                  <span class="tab-label"><el-icon><FolderRemove/></el-icon>事件分析</span>
                </template>
              </el-tab-pane>
              <el-tab-pane name="monitorScreen" label="监测大屏">
                <template #label>
                  <span class="tab-label"><el-icon><TrendCharts/></el-icon>监测大屏</span>
                </template>
              </el-tab-pane>
            </el-tabs>
            <el-icon class="right-icon">
              <Setting/>
            </el-icon>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'
import MenuElement from '@/views/components/MenuElement.vue'

const router = useRouter()
const activeTab = ref('monitorManagement')
const isCollapse = ref(false)
provide('isCollapse', isCollapse)
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
const handleTabClick = (tab) => {
  const routeMap = {
    todayHotspots: '/hotSpot',
    monitorAnalysis: '/monitor-analysis',
    dataMonitoring: '/data-monitor',
    monitorManagement: '/monitor-manage',
    fullTextSearch: '/fullText-search',
    eventAnalysis: '/event-analysis',
    monitorScreen: '/monitor-screen'
  }

  router.push(routeMap[tab.props.name])
}
</script>

<style scoped lang="scss">
.common-layout {
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.el-container {
  height: 100%;
}

.el-aside {
  background: rgb(65, 71, 85);
  height: 100%;
  transition: width 0.3s ease; /* 动画效果 */
}

.toggle-button {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  margin-right: 20px;
  position: relative;
  top: 21px;
  left: -5px;
  height: 0;
  width: 30px;
  z-index: 999;
  padding-left: 5px;
}

.toggle-button .el-icon {
  padding: 10px 11px 10px 10px;
}

.el-header {
  padding: 0 !important;
  margin: 0 !important;
}

.tab-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-container {
  position: relative;
  padding: 0 !important;
  margin: 0 !important;
  width: 100%;
  height: 100%;
}

.right-icon {
  position: absolute;
  top: 12px;
  right: 20px;
  cursor: pointer;
}
</style>
