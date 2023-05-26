<template>
  <div id="userpage">
    <van-image
      style="margin-left: 25%; margin-bottom: 5px; margin-top: 8px"
      round
      width="8rem"
      height="8rem"
      :src="user.userAvatar"
      @click="doUpdateAvatar"
    />
    <van-cell
      title="昵称"
      is-link
      to="/user/edit"
      :value="user.userName"
      @click="toEdit('userName', user.userName, '昵称')"
    />
    <van-cell title="账号" :value="user.userAccount" />
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
      @click="toEdit('userProfile', user.userProfile, '简介')"
    >
      <template #value>
        <van-text-ellipsis rows="2" :content="user.userProfile" />
      </template>
    </van-cell>
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
    <van-cell title="更多操作" @click="show = true" is-link icon="more-o" />

    <div>
      <van-action-sheet
        v-model:show="show"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @select="onSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import myAxios from "../../plugins/myAxios";
import { ref } from "vue";

import type { UserVO } from "../../models/user";
import { showConfirmDialog, showFailToast, showSuccessToast } from "vant";
import { getLoginUser } from "../../service/user";
import { parseDate } from "../../service/date";

const user = ref<UserVO>({
  id: 0,
  userName: "",
  userAccount: "",
  gender: 0,
  phone: "",
  email: "",
  userRole: 0,
  tags: [],
  createTime: new Date(),
});

onMounted(async () => {
  const res = await getLoginUser();
  if (!res) {
    showFailToast("请先登录！");
  }
  user.value = res;
});

const doUpdateAvatar = () => {
  toEdit("userAvatar", user.value.userAvatar, "头像");
};

const router = useRouter();

const show = ref(false);
const actions = [
  {
    name: "注销账号",
    color: "#ee0a24",
    subname: "此操作将会删除账号，谨慎操作",
  },
  { name: "退出登录" },
];

const onSelect = (index: any) => {
  if (index.name === "退出登录") {
    showConfirmDialog({
      title: "确认退出？",
    })
      .then(async () => {
        // on confirm
        const res = await myAxios.post("/user/logout");
        if (res.code === 0) {
          showSuccessToast("退出成功");
          router.push("/login");
        }
      })
      .catch(() => {
        // on cancel
      });
  } else if (index.name === "注销账号") {
    showConfirmDialog({
      title: "确认注销？此操作不可逆！",
    })
      .then(() => {
        // on confirm
        showFailToast("暂时不给！");
      })
      .catch(() => {
        // on cancel
      });
  }
};

/**
 * 前往修改
 * @param editKey edit key
 * @param curVal 当前值
 * @param editName 修改的字段名
 */
const toEdit = (editKey: string, curVal: any, editName: string) => {
  router.push({
    path: "/user/edit",
    query: {
      id: user.value.id,
      editKey,
      curVal,
      editName,
    },
  });
};
</script>

<style scoped>
#userpage {
  padding-bottom: 50px;
}
</style>
