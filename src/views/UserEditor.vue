<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!--        <menu-element></menu-element>-->
        <editor-navigation></editor-navigation>
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
          <div class="mainContent">
            <p class="naviSet">系统设置&nbsp;>&nbsp;账号管理</p>
            <div class="account">
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="userName" label="用户名"/>
                <!--                <el-table-column prop="companyName" label="公司名称" width="180"/>-->
                <el-table-column prop="email" label="邮箱地址" width="200"/>
                <el-table-column prop="userStatus" label="用户状态"/>
                <!--                <el-table-column prop="loginTime" label="登录次数"/>-->
                <el-table-column prop="recentLogin" label="最近一次登录" width="200"/>
                <el-table-column prop="operation" label="操作"/>
              </el-table>
            </div>
          </div>

          <!--          <router-view></router-view>-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
// import MenuElement from '@/views/components/MenuElement.vue'
import NavigationElement from '@/views/components/NavigationElement.vue'
import EditorNavigation from '@/views/components/EditorNavigation.vue'

const isCollapse = ref(false) // 侧边栏折叠状态
provide('isCollapse', isCollapse)
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
const tableData = [
  {
    userName: 'y',
    // companyName: 'y',
    email: '33@qq.com',
    userStatus: '正常',
    // loginTime: '18',
    recentLogin: '2025-2-12 05:30:21'
  }
]
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

.el-main {
  padding: 0;
  height: 100%;
}

.mainContent {
  background-color: rgb(238, 245, 249);
  height: 100%;
}

.naviSet {
  font-size: 12px;
  float: left;
  margin: 15px;
}

.account {
  margin: 0 20px;
}
</style>
