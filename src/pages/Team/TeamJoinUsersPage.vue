<template>
  <van-empty v-if="!userList.length" description="查询无果" />
  <div id="content">
    <user-card-list :user-list="userList" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { UserVO } from "../../models/user";
import { onMounted, ref } from "vue";
import myAxios from "../../plugins/myAxios";
import { showFailToast } from "vant";

const route = useRoute();
const teamId = route.query.teamId;

const userList = ref([] as UserVO[]);
const loading = ref(false);
onMounted(async () => {
  loading.value = true;
  const res = await myAxios.get("/team/query/join", {
    params: {
      id: teamId,
    },
  });
  if (res.data) {
    res.data.forEach((user: { tags: string }) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    });
    userList.value = res.data;
  } else {
    showFailToast(res.message);
  }
  loading.value = false;
});
</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
