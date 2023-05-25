<template>
  <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" />

  <div id="content">
    <router-view></router-view>
  </div>

  <van-tabbar route>
    <van-tabbar-item name="index" icon="home-o" to="/">主页</van-tabbar-item>
    <van-tabbar-item name="search" icon="search" to="/search"
      >搜索</van-tabbar-item
    >
    <van-tabbar-item name="team" icon="friends-o" to="/team"
      >队伍</van-tabbar-item
    >

    <van-tabbar-item name="options" icon="fire-o" to="/opt"
      >寻心</van-tabbar-item
    >
    <van-tabbar-item name="user" icon="manager-o" to="/user"
      >个人</van-tabbar-item
    >
  </van-tabbar>
</template>

<script setup lang="ts">
const onClickLeft = () => history.back();
</script>

<style scoped>
#notic-bar {
  padding-top: 50px;
  margin-top: 50px;
}
</style>
