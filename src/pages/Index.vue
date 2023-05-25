<template>
  <van-empty v-if="!userList.length" description="查询无果" />
  <div id="content">
    <user-card-list :user-list="userList" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";
import myAxios from "../plugins/myAxios";
import { UserVO } from "../models/user";
import UserCardList from "../components/UserCardList.vue";

const userList = ref([] as UserVO[]);
onMounted(async () => {
  const res = await myAxios.get("/user/list/page", {
    params: {
      pageNum: 1,
      pageSize: 10,
    },
  });

  if (res.data.records) {
    res.data.records.forEach((user: { tags: string }) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    });
  }
  userList.value = res.data.records;
});
</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
