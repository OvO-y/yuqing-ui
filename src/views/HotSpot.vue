<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="header-container">
          <!-- Tab bar -->
          <div class="toggle-button">
            <!--            <el-icon v-if="!isCollapse">-->
            <!--              <Fold/>-->
            <!--            </el-icon>-->
            <el-icon>
              <Expand/>
            </el-icon>
          </div>

          <navigation-element :activeIndex="activeIndex">
            <template #toggle-button>
              <div class="toggle-button" @click="toggleCollapse">
                <el-icon>
                  <Expand/>
                </el-icon>
              </div>
            </template>
          </navigation-element>
          <el-icon class="right-icon" @click="jumpSetting">
            <Setting/>
          </el-icon>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'
//
// const router = useRouter()
// const activeTab = ref('todayHotspots')
//
// // Method to handle tab click events
// const handleTabClick = (tab) => {
//   const routeMap = {
//     todayHotspots: '/hotSpot',
//     monitorAnalysis: '/monitor-analysis',
//     dataMonitoring: '/data-monitor',
//     monitorManagement: '/monitor-manage',
//     fullTextSearch: '/fullText-search',
//     eventAnalysis: '/event-analysis',
//     monitorScreen: '/monitor-screen'
//   }
//
//   router.push(routeMap[tab.props.name])
// }
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavigationElement from '@/views/components/NavigationElement.vue'

const router = useRouter()
const route = useRoute()
// 导肮栏监听路由变化来更新 activeIndex
const activeIndex = ref('/hotSpot')
watch(
  () => route.path,
  (newPath) => {
    activeIndex.value = newPath
  }
)
function jumpSetting () {
  router.push({ path: '/user-editor' })
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
}

.el-header {
  padding: 0;
}

.el-tabs {
  border: none; /* 去除边框 */
}

.tab-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.right-icon {
  position: absolute;
  top: 12px;
  right: 20px;
  cursor: pointer;
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
  //padding: 10px 11px 10px 10px;
  padding: 28px 10px 10px 20px
}

.header-container {
  position: relative;
  padding: 0 !important;
  margin: 0 !important;
  width: 100%;
  height: 100%;
}
</style>
