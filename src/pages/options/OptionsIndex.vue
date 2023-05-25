<template>
  <van-notice-bar left-icon="volume-o" :scrollable="false" mode="closeable">
    <van-swipe
      vertical
      class="notice-swipe"
      :autoplay="3000"
      :touchable="false"
      :show-indicators="false"
    >
      <van-swipe-item>明月直入，无心可猜。</van-swipe-item>
      <van-swipe-item>仙人抚我顶，结发受长生。</van-swipe-item>
      <van-swipe-item>今人不见古时月，今月曾经照古人。</van-swipe-item>
    </van-swipe>
  </van-notice-bar>

  <van-divider dashed>找寻心语</van-divider>

  <van-cell title="创建队伍" icon="friends-o" is-link @click="doCreateTeam">
    <van-tag type="primary">创建属于你的好群体</van-tag>
  </van-cell>

  <van-divider dashed>打造自己</van-divider>

  <van-cell title="探索" icon="search" is-link @click="doSelectMyTags">
    <van-tag type="success">找寻属于自己的标签</van-tag>
  </van-cell>

  <van-divider dashed>占个坑位</van-divider>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const doCreateTeam = () => {
  router.push("/team/add");
};

const doSelectMyTags = () => {
  router.push("/tag/select");
};
</script>

<style scoped>
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>
