<template>
  <div id="teampage">
    <team-card-list :team-list="teamList" />
  </div>
</template>

<script setup lang="ts">
import { TeamType } from "../../models/team";
import { onMounted, ref } from "vue";
import myAxios from "../../plugins/myAxios";
import TeamCardList from "../../components/TeamCardList.vue";
import { useRoute } from "vue-router";
import { LIST_TEAM_TYPE } from "../../models/common";

const teamList = ref([] as TeamType[]);

const route = useRoute();

const listType = route.query.type;

const pageRequest = {
  pageNum: 1,
  pageSize: 10,
};

const listMyJoinTeam = async () => {
  const res = await myAxios.get("/team/my/join", {
    params: pageRequest,
  });
  if (res.data) {
    teamList.value = res.data.records;
  }
};
const listMyLeadTeam = async () => {
  const res = await myAxios.get("/team/my/lead", {
    params: pageRequest,
  });
  if (res.data) {
    teamList.value = res.data.records;
  }
};
const listMyCreateTeam = async () => {
  const res = await myAxios.get("/team/my/create", {
    params: pageRequest,
  });
  if (res.data) {
    teamList.value = res.data.records;
  }
};

/**
 * 初始化数据
 */
const initData = async () => {
  if (Number(listType) === LIST_TEAM_TYPE.JOIN) {
    listMyJoinTeam();
  } else if (Number(listType) === LIST_TEAM_TYPE.LEAD) {
    listMyLeadTeam();
  } else if (Number(listType) === LIST_TEAM_TYPE.CREATE) {
    listMyCreateTeam();
  }
};

onMounted(() => {
  initData();
});
</script>

<style scoped>
#teampage {
  padding-bottom: 50px;
}
</style>
