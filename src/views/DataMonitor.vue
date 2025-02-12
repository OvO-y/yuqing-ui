<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
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
            <navigation-element :activeIndex="activeIndex"></navigation-element>
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
import { provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MenuElement from '@/views/components/MenuElement.vue'
import NavigationElement from '@/views/components/NavigationElement.vue'

const router = useRouter()
const route = useRoute()
// 导肮栏监听路由变化来更新 activeIndex
const activeIndex = ref('/data-monitor')
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
