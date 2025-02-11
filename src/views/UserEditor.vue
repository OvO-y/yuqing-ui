<script setup>
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
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
          >

            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <VideoPlay/>
                </el-icon>
                <span>预警设置</span>
              </template>
              <el-menu-item-group>
                <!--              <template #title>-->
                <!--                <span>检测分析</span>-->
                <!--              </template>-->
                <el-menu-item index="1-1">配置列表</el-menu-item>
                <el-menu-item index="1-2">消息列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="2">
              <el-icon>
                <DocumentAdd/>
              </el-icon>
              <template #title>偏好设置</template>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon>
                <DocumentAdd/>
              </el-icon>
              <template #title>收藏夹</template>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon>
                <DocumentAdd/>
              </el-icon>
              <template #title>账号管理</template>
            </el-menu-item>
            <!-- 菜单项 -->
          </el-menu>
        </el-col>
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
            <el-tabs v-model="activeTab" type="border-card" @tab-click="handleTabClick">
              <el-tab-pane>
              </el-tab-pane>
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
                数据监测
              </el-tab-pane>
              <el-tab-pane name="monitorManagement" label="监测管理">
                <template #label>
                  <span class="tab-label"><el-icon><Operation/></el-icon>监测管理</span>
                </template>
              </el-tab-pane>
              <el-tab-pane name="fullTextSearch" label="全文搜索">
                <template #label>
                  <span class="tab-label"><el-icon><Search/></el-icon> 全文搜索</span>
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

<style scoped lang="scss">

</style>
