<template>
  <el-menu
    :default-active="props.activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <div class="extra-content">
      <slot name="toggle-button"></slot>
    </div>
    <el-menu-item index="/hotSpot">今日热点</el-menu-item>
    <el-menu-item index="/monitor-analysis">监测分析</el-menu-item>
    <el-menu-item index="/data-monitor">数据监测</el-menu-item>
    <el-menu-item index="/monitor-manage">监测管理</el-menu-item>
    <el-menu-item index="/fullText-search">全文搜索</el-menu-item>
    <el-menu-item index="/event-analysis">事件分析</el-menu-item>
    <el-menu-item index="/monitor-screen">监测大屏</el-menu-item>
  </el-menu>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  activeIndex: String
})

const router = useRouter()

const handleSelect = (key) => {
  router.push(key)
}
</script>

<style scoped lang="scss">
.el-menu-demo .extra-content {
  float: left;
  //margin-right: auto; /* 自动边距使按钮靠左，菜单项靠右 */
}
</style>
