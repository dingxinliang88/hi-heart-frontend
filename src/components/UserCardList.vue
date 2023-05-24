<template>
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
  <van-empty v-if="!userList || !userList.length" description="结果为空" />
</template>

<script setup lang="ts">
import { UserVO } from "../models/user";

interface userCardListProps {
  userList: UserVO[];
}

const props = withDefaults(defineProps<userCardListProps>(), {
  //@ts-ignore
  userList: [] as UserVO[],
});
</script>

<style scoped></style>
