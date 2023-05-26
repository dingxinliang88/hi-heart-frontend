<template>
  <van-divider dashed>我的标签</van-divider>
  <van-empty :image-size="[60, 40]" v-if="!loginUser.tags" />
  <template v-for="tag in loginUser.tags">
    <van-tag type="primary" size="large" round class="fancy-tag">
      <van-icon name="star" class="tag-icon"></van-icon>
      {{ tag }}
    </van-tag>
  </template>

  <van-divider dashed>打造自己</van-divider>
  <van-cell title="探索" icon="search" is-link @click="doSelectMyTags">
    <van-tag type="success">找寻属于自己的标签</van-tag>
  </van-cell>
  <van-cell title="创造" icon="plus" is-link @click="doAddTags">
    <van-tag type="success">创建不同个性的标签</van-tag>
  </van-cell>

  <van-divider dashed>找寻心语</van-divider>
  <van-cell title="创建队伍" icon="friends-o" is-link @click="doCreateTeam">
    <van-tag type="primary">创建属于你的好群体</van-tag>
  </van-cell>
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

const doAddTags = () => {
  router.push("/tag/add");
};

const loginUser = ref({} as UserVO);
onMounted(async () => {
  const res = await getLoginUser();
  res.tags = JSON.parse(res.tags);
  loginUser.value = res;
});
</script>

<style scoped>
.fancy-tag {
  background-color: #ffefd5;
  color: #ff4500;
  border: solid #ffdab9;
  border-width: 2px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  font-size: 18px;
  margin: 6px;
  padding: 8px 10px;
  text-shadow: 1px 1px 1px rgba(255, 69, 0, 0.3);
}

.tag-icon {
  font-size: 20px;
  margin-right: 6px;
}
</style>
