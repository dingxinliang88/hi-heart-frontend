<template>
  <van-cell title="搜索你想要的队伍" is-link icon="search" @click="showPopup" />
  <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }">
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
  </van-popup>

  <div id="teampage">
    <team-card-list :team-list="teamList" />
  </div>
</template>

<script setup lang="ts">
import { TeamType } from "../../models/team";
import { onMounted, ref } from "vue";
import myAxios from "../../plugins/myAxios";
import TeamCardList from "../../components/TeamCardList.vue";
import emitter from "../../plugins/mitt";

const teamList = ref([] as TeamType[]);

/**
 * 刷新数据
 */
emitter.on("update-team-list", (flag: boolean) => {
  if (flag) {
    initData();
  }
});

/**
 * 初始化数据
 */
const initData = async () => {
  const res = await myAxios.get("/team/list", {
    params: {
      pageNum: 1,
      pageSize: 10,
    },
  });
  if (res.code === 0 && res.data) {
    teamList.value = res.data.records;
  }
};

onMounted(() => {
  initData();
});

const show = ref(false);
const showPopup = () => {
  show.value = true;
};
const searchText = ref("");
const status = ref("0");

/**
 * 取消搜索
 */
const onCancel = () => {
  searchText.value = "";
  show.value = false;
};

const doSearchResult = async () => {
  const searchData = {
    searchText: searchText.value,
    status: Number(status.value),
  };

  const res = await myAxios.get("/team/query", {
    params: searchData,
  });

  if (res.code === 0 && res.data) {
    teamList.value = res.data.records;
  }
  show.value = false;
};
</script>

<style scoped>
#teampage {
  padding-bottom: 50px;
}
</style>
