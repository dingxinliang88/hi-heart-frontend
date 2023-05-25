<template>
  <template v-for="user in userList">
    <van-card
      :tag="user.id.toString()"
      :title="user.userName"
      :thumb="user.userAvatar"
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
        <van-button size="small" type="success" @click="doTransfer(user.id)"
          >转让给他</van-button
        >
      </template>
    </van-card>
  </template>
</template>

<script setup lang="ts">
import { ref } from "vue";
import myAxios from "../../plugins/myAxios";
import { showFailToast, showSuccessToast } from "vant";
import { useRoute, useRouter } from "vue-router";
import { UserVO } from "../../models/user";
import { onMounted } from "vue";
import { getLoginUser } from "../../service/user";

const router = useRouter();

const route = useRoute();
const teamId = Number(route.query.teamId);
const loginUser = ref({} as UserVO);

const userList = ref([] as UserVO[]);
onMounted(async () => {
  loginUser.value = await getLoginUser();
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
    userList.value = res.data.filter((user: UserVO) => {
      return user.id !== loginUser.value.id;
    });
  }
});

const doTransfer = async (userId: number) => {
  const transferData = {
    teamId,
    nextLeaderId: userId,
  };
  const res = await myAxios.put("/team/transfer", transferData);
  if (res.data) {
    showSuccessToast("转让成功");
    router.back();
  } else {
    showFailToast(res.message);
  }
};
</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
