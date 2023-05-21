<template>
  <van-cell
    title="昵称"
    is-link
    to="/user/edit"
    :value="user.userName"
    @click="toEdit('userName', user.userName, '昵称')"
  />
  <van-cell title="账号" :value="user.userAccount" />
  <van-cell
    title="头像"
    is-link
    to="/user/edit"
    @click="toEdit('userAvatar', user.userAvatar, '头像')"
  >
    <img style="height: 48px" :src="user.userAvatar" />
  </van-cell>
  <van-cell
    title="性别"
    is-link
    to="/user/edit"
    :value="user.gender == 1 ? '男' : '女'"
    @click="toEdit('gender', user.gender, '性别')"
  />
  <van-cell
    title="简介"
    is-link
    to="/user/edit"
    :value="user.userProfile"
    @click="toEdit('userProfile', user.userProfile, '简介')"
  />
  <van-cell
    title="电话"
    is-link
    to="/user/edit"
    :value="user.phone"
    @click="toEdit('phone', user.phone, '电话')"
  />
  <van-cell
    title="邮箱"
    is-link
    to="/user/edit"
    :value="user.email"
    @click="toEdit('email', user.email, '邮箱')"
  />
  <van-cell title="注册时间" :value="parseDate(user.createTime)" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const user = {
  id: 5,
  userName: "Admin",
  userAccount: "admin",
  userAvatar:
    "https://thumbs.dreamstime.com/b/admin-sign-laptop-icon-stock-vector-166205404.jpg",
  userProfile: "我是管理员，特殊账号",
  gender: 1,
  phone: "741741741",
  email: "741741741@741.com",
  userRole: 1,
  createTime: new Date(),
};

const router = useRouter();

const toEdit = (editKey: string, curVal: any, editName: string) => {
  router.push({
    path: "/user/edit",
    query: {
      editKey,
      curVal,
      editName,
    },
  });
};

/**
 * 转换日期显示
 * @param date 日期
 */
const parseDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
</script>

<style scoped></style>
