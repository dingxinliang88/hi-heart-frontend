<template>
  <van-form @submit="onSubmit">
    <van-image
      style="margin-left: 25%; margin-bottom: 5px; margin-top: 8px"
      round
      width="10rem"
      height="10rem"
      :src="logo"
    />

    <van-cell-group inset>
      <van-field
        v-model="userAccount"
        name="账号"
        label="账号"
        placeholder="账号"
        :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
        v-model="userPassword"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="checkedPassword"
        type="password"
        name="密码"
        label="再次输入密码"
        placeholder="请再次填写密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
    <br />
    <span @click="doLogin" style="color: #160cce" class="float-right"
      >已经有账号了？去登录</span
    >
  </van-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import myAxios from "../../plugins/myAxios";
import { showFailToast, showSuccessToast } from "vant";
import logo from "../../assets/logo.png";
const router = useRouter();

const userAccount = ref("");
const userPassword = ref("");
const checkedPassword = ref("");
const onSubmit = async () => {
  const res = await myAxios.post("/user/register", {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkedPassword: checkedPassword.value,
  });
  if (res.code === 0 && res.data) {
    showSuccessToast("注册成功");
    router.push("/login");
  } else {
    showFailToast(res.message);
  }
};

const doLogin = () => {
  router.push({
    path: "/login",
    replace: true,
  });
};
</script>

<style scoped>
.float-right {
  display: block;
  margin-left: 13px;
  overflow: hidden;
  text-align: right;
  margin-right: 10px;
}
</style>
