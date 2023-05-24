<template>
  <van-nav-bar
    title="标题"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view></router-view>
  </div>

  <van-tabbar route>
    <van-tabbar-item name="index" icon="home-o" to="/">主页</van-tabbar-item>
    <van-tabbar-item name="team" icon="friends-o" to="/team"
      >队伍</van-tabbar-item
    >
    <van-tabbar-item name="plus" icon="plus" to="/team/add"
      >新增</van-tabbar-item
    >
    <van-tabbar-item name="user" icon="manager-o" to="/user"
      >个人</van-tabbar-item
    >
  </van-tabbar>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const onClickLeft = () => history.back();
const onClickRight = () => router.push("/search");
</script>

<style scoped></style>
