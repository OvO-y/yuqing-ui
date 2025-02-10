<template>
  <el-col>
    <h3 class="menu-title">网络情报分析系统</h3>
    <!--        <h1 class="mb-2">网络情报分析系统</h1>-->
    <el-menu
      default-active="2"
      background-color=rgb(65,71,85)
      class="el-menu-vertical-demo"
      text-color="#fff"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <el-menu-item index="1">
        <el-icon>
          <DocumentAdd/>
        </el-icon>
        <template #title>新建舆情监测</template>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <VideoPlay/>
          </el-icon>
          <span>舆情监测</span>
        </template>
        <el-menu-item-group>
          <!--              <template #title>-->
          <!--                <span>检测分析</span>-->
          <!--              </template>-->
          <el-menu-item index="/monitor-analysis">监测分析</el-menu-item>
          <el-menu-item index="/data-monitor">数据监测</el-menu-item>
          <el-menu-item index="/monitor-manage">监测管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!-- 菜单项 -->
    </el-menu>
  </el-col>
</template>
<style scoped lang="scss">
.el-menu ul, li {
  width: 100%;
}

.menu-title {
  color: white;
  padding: 5px
}
</style>
