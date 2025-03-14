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
        <MenuElement></MenuElement>
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
            <navigation-element :activeIndex="activeIndex">
              <template #toggle-button>
                <div class="toggle-button" @click="toggleCollapse">
                  <el-icon v-if="!isCollapse">
                    <Fold/>
                  </el-icon>
                  <el-icon v-else>
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
    </el-container>
  </div>
</template>

<script setup>
import { ref, provide, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MenuElement from '@/views/components/MenuElement.vue'
import NavigationElement from '@/views/components/NavigationElement.vue'

const router = useRouter()
// const activeTab = ref('eventAnalysis')
const route = useRoute()
// 导肮栏监听路由变化来更新 activeIndex
const activeIndex = ref('/event-analysis')
watch(
  () => route.path,
  (newPath) => {
    activeIndex.value = newPath
  }
)
const isCollapse = ref(false) // 侧边栏折叠状态
provide('isCollapse', isCollapse)
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
// Method to handle tab click events
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
// 设置
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
  //left: 11px;
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
