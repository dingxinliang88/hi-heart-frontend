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

  <van-cell title="搜索用户" icon="user-o" is-link @click="doSearchUser">
    <van-tag type="primary">找寻你的好伙伴</van-tag>
  </van-cell>

  <van-cell title="搜索队伍" icon="friends-o" is-link @click="doSearchTeam">
    <van-tag type="primary">找寻你的好群体</van-tag>
  </van-cell>

  <van-divider dashed>关于我的</van-divider>

  <van-cell title="获取我的" icon="search" is-link @click="doSearchMyJoinTeam">
    <van-tag type="success">我加入的队伍</van-tag>
  </van-cell>
  <van-cell title="获取我的" icon="search" is-link @click="doSearchMyLeadTeam">
    <van-tag type="success">我领导的队伍</van-tag>
  </van-cell>
  <van-cell
    title="获取我的"
    icon="search"
    is-link
    @click="doSearchMyCreateTeam"
  >
    <van-tag type="success">我创建的队伍</van-tag>
  </van-cell>

  <van-divider dashed>占个坑位</van-divider>
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import { useRouter } from "vue-router";
import { LIST_TEAM_TYPE } from "../../models/common";

const router = useRouter();

const doSearchUser = () => {
  router.push("/search/user");
};

const doSearchTeam = () => {
  showFailToast("暂时移动到队伍页了哦～");
};

const doSearchMyJoinTeam = () => {
  router.push({
    path: "/search/my/team",
    query: {
      type: LIST_TEAM_TYPE.JOIN,
    },
  });
};
const doSearchMyLeadTeam = () => {
  router.push({
    path: "/search/my/team",
    query: {
      type: LIST_TEAM_TYPE.LEAD,
    },
  });
};

const doSearchMyCreateTeam = () => {
  router.push({
    path: "/search/my/team",
    query: {
      type: LIST_TEAM_TYPE.CREATE,
    },
  });
};
</script>

<style scoped>
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>
