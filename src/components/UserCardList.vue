<template>
  <van-skeleton
    title
    avatar
    :row="3"
    :loading="props.loading"
    v-for="user in props.userList"
  >
    <van-card
      :title="user.userName"
      :thumb="user.userAvatar"
      :tag="user.id.toString()"
    >
      <template #desc>
        <van-text-ellipsis
          :content="user.userProfile"
          expand-text="展开"
          collapse-text="收起"
        />
      </template>
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
        <van-button round size="small" type="primary">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>

  <van-empty v-if="!userList || !userList.length" description="结果为空" />
</template>

<script setup lang="ts">
import { UserVO } from "../models/user";

interface userCardListProps {
  userList: UserVO[];
  loading: boolean;
}

const props = withDefaults(defineProps<userCardListProps>(), {
  //@ts-ignore
  userList: [] as UserVO[],
  loading: true,
});
</script>

<style scoped></style>
