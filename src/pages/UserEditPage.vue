<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="editUser.curval"
      :name="editUser.editKey"
      :label="editUser.editName"
      :placeholder="`请输入${editUser.editName}`"
    />
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "../plugins/myAxios";
import { showSuccessToast } from "vant";

const route = useRoute();
const router = useRouter();

const editUser = ref({
  id: route.query.id,
  editKey: route.query.editKey as string,
  curval: route.query.curVal as any,
  editName: route.query.editName as string,
});

const oldVal = ref(editUser.value.curval);

const onSubmit = async (values: any) => {

  if (oldVal.value === editUser.value.curval) {
    showSuccessToast("没有更改信息哦～～");
    return;
  }
  const res = await myAxios.put("/user/update", {
    ...values,
    id: editUser.value.id,
  });
  if (res.code === 0) {
    showSuccessToast("修改成功");
    router.back();
  }
};
</script>

<style scoped></style>
