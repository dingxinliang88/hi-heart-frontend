<template>
  <van-empty v-if="!userList.length" description="查询无果" />
  <template v-for="user in userList">
    <van-card
      :desc="user.userProfile"
      :title="user.userName"
      :thumb="user.userAvatar"
    >
      <template #tags>
        <van-tag
          plain
          type="success"
          v-for="tag in user.tags"
          style="margin-right: 8px; margin-top: 8px"
        >
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button round size="small" type="danger">举报</van-button>
        <van-button round size="small" type="primary">联系我</van-button>
      </template>
    </van-card>
  </template>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";
import myAxios from "../plugins/myAxios";
import { useRoute } from "vue-router";
import qs from "qs";
import { UserVO } from "../models/user";

// const mockUser = ref({
//   id: 5,
//   userName: "Admin",
//   userAccount: "admin",
//   userAvatar:
//     "https://thumbs.dreamstime.com/b/admin-sign-laptop-icon-stock-vector-166205404.jpg",
//   userProfile: "我是管理员，特殊账号",
//   gender: 1,
//   phone: "741741741",
//   email: "741741741@741.com",
//   userRole: 1,
//   tags: ["Java", "静坐", "大二"],
//   createTime: new Date(),
// });

const route = useRoute();

const { tags } = route.query;
// 用户列表
const userList = ref([] as UserVO[]);

onMounted(async () => {
  const res = await myAxios.get("/user/query/tags", {
    params: {
      tagList: tags,
    },
    paramsSerializer: {
      serialize: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    },
  });
  if (res.data) {
    res.data.forEach((user: { tags: string }) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    });
  }
  userList.value = res.data;
});
</script>

<style scoped></style>
