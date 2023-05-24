<template>
  <van-empty v-if="!userList.length" description="查询无果" />
  <user-card-list :user-list="userList" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";
import myAxios from "../../plugins/myAxios";
import { useRoute } from "vue-router";
import qs from "qs";
import { UserVO } from "../../models/user";
import UserCardList from "../../components/UserCardList.vue";

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
