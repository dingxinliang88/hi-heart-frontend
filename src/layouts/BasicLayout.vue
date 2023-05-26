<template>
  <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />

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
import { ref } from "vue";
import { useRouter } from "vue-router";
import routes from "../config/route";

const router = useRouter();
const DEFAULT_TITLE = "寻心";
const title = ref(DEFAULT_TITLE);

/**
 * 根据路由切换标题
 */
router.beforeEach((to, _) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath === route.path;
  });
  title.value = route?.name ?? DEFAULT_TITLE;
});

const onClickLeft = () => history.back();
</script>

<style scoped>
#notic-bar {
  padding-top: 50px;
  margin-top: 50px;
}
</style>
