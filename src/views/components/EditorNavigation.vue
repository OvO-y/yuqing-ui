<template>
  <el-col>
    <!--    <h3 class="menu-title">网络情报分析系统</h3>-->
    <!--        <h1 class="mb-2">网络情报分析系统</h1>-->
    <el-menu
      default-active="user-editor"
      background-color=rgb(65,71,85)
      class="el-menu-vertical-demo"
      text-color="#fff"
      :collapse="isCollapse"
      router
    >
        <el-menu-item-group>
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <Bell/>
              </el-icon>
              <span>预警设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/Waring">配置列表</el-menu-item>
              <el-menu-item index="/waringMessage">消息列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon>
              <Filter/>
            </el-icon>
            <template #title>偏好设置</template>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon>
              <Star/>
            </el-icon>
            <template #title>收藏夹</template>
          </el-menu-item>
          <el-menu-item index="user-editor">
            <el-icon>
              <Avatar/>
            </el-icon>
            <template #title>账号管理</template>
          </el-menu-item>
        </el-menu-item-group>
      <!-- 菜单项 -->
    </el-menu>
  </el-col>
</template>
<script setup>
import { inject } from 'vue'

const isCollapse = inject('isCollapse')
</script>
<style scoped lang="scss">
.el-menu ul, li {
  width: 100%;
}

.menu-title {
  color: white;
  padding: 5px
}

ul {
  border: none;
}
</style>
