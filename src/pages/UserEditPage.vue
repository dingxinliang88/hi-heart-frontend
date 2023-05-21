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
import { useRoute } from "vue-router";

const route = useRoute();

const editUser = ref({
  editKey: route.query.editKey as string,
  curval: route.query.curVal as any,
  editName: route.query.editName as string,
});

const onSubmit = (values: any) => {
  //TODO 提交后台
  console.log("onSubmit", values);
};
</script>

<style scoped></style>
