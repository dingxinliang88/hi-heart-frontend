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
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
    <br />
    <span @click="doRegister" style="color: #160cce" class="float-right"
      >还没有账号？注册一个</span
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
const onSubmit = async () => {
  const res = await myAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  });
  if (res.code === 0 && res.data) {
    showSuccessToast("登录成功");
    router.push("/");
  } else {
    showFailToast("登录失败");
  }
};

const doRegister = () => {
  router.push({
    path: "/register",
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
