<template>
  <form action="/">
    <van-search
      v-model="searchText"
      show-action
      placeholder="请输入搜索关键词"
      @cancel="onCancel"
    />
  </form>

  <van-field name="radio" label="队伍状态">
    <template #input>
      <van-radio-group v-model="status" direction="horizontal">
        <van-radio name="0">公开</van-radio>
        <van-radio name="2">加密</van-radio>
        <van-radio name="1">我都要</van-radio>
      </van-radio-group>
    </template>
  </van-field>

  <div style="padding: 16px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import myAxios from "../../plugins/myAxios";

const searchText = ref("");
const status = ref("0");

/**
 * 取消搜索
 */
const onCancel = () => {
  searchText.value = "";
};

const router = useRouter();

const doSearchResult = async () => {
  const searchData = {
    searchText: searchText.value,
    status: Number(status.value),
  };

  const res = await myAxios.get("/team/query", {
    params: searchData,
  });

  if (res.code === 0 && res.data) {
    const teamList = res.data.records;
    console.log("search list: @@, ", teamList);
    router.push("/team");
  }
};
</script>

<style scoped></style>
