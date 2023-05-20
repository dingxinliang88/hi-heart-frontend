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
    <template v-if="active === 'index'">
      <Index />
    </template>
    <template v-if="active === 'team'">
      <Team />
    </template>
    <template v-if="active === 'user'">
      <User />
    </template>
  </div>

  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item name="index" icon="home-o"> 主页 </van-tabbar-item>
    <van-tabbar-item name="team" icon="friends-o">队伍</van-tabbar-item>
    <van-tabbar-item name="user" icon="manager-o">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from "vue";
import { showToast } from "vant";
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
const onClickLeft = () => history.back();
const onClickRight = () => showToast("按钮");

const active = ref("index");
const onChange = (index) => showToast(`标签 ${index}`);
</script>

<style scoped></style>
