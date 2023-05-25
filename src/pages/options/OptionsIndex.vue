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

  <van-divider dashed>我的标签</van-divider>
  <template v-for="tag in loginUser.tags">
    <van-tag type="primary" size="large" round>
      <van-icon name="star" class="tag-icon"></van-icon>
      {{ tag }}
    </van-tag>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { UserVO } from "../../models/user";
import { getLoginUser } from "../../service/user";

const router = useRouter();

const doCreateTeam = () => {
  router.push("/team/add");
};

const doSelectMyTags = () => {
  router.push("/tag/select");
};

const loginUser = ref({} as UserVO);
onMounted(async () => {
  const res = await getLoginUser();
  res.tags = JSON.parse(res.tags);
  loginUser.value = res;
});
</script>

<style scoped>
.notice-swipe {
  height: 40px;
  line-height: 40px;
}

.tag-icon {
  font-size: 20px;
  margin-right: 6px;
}
</style>
