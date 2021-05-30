<template>
  <div id="app">
    <!-- 离开时页面不销毁 exclude排除在外，重新拿到新的数据-->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
