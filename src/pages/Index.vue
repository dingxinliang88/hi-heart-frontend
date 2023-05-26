<template>
  <van-cell center title="寻心模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" />
    </template>
  </van-cell>

  <van-empty v-if="!userList.length" description="查询无果" />
  <div id="content">
    <user-card-list :user-list="userList" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";
import myAxios from "../plugins/myAxios";
import { UserVO } from "../models/user";
import UserCardList from "../components/UserCardList.vue";
import { showFailToast } from "vant";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";

const userList = ref([] as UserVO[]);

const isMatchMode = ref<boolean>(false);

const loading = ref(false);
const router = useRouter();

const loadData = async () => {
  loading.value = true;
  if (isMatchMode.value) {
    // 匹配用户
    const res = await myAxios.get("/user/match");
    if (res.code === 0 && res.data.records) {
      res.data.records.forEach((user: { tags: string }) => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      });
      userList.value = res.data.records;
    } else {
      showFailToast(res.message);
      router.push("/tag/select");
    }
  } else {
    // 普通模式
    const res = await myAxios.get("/user/list/page", {
      params: {
        pageNum: 1,
        pageSize: 10,
      },
    });
    if (res.code === 0 && res.data.records) {
      res.data.records.forEach((user: { tags: string }) => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      });
      userList.value = res.data.records;
    } else {
      showFailToast(res.message);
    }
  }
  loading.value = false;
};

onMounted(() => {
  loadData();
});

watchEffect(() => {
  loadData();
});
</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
