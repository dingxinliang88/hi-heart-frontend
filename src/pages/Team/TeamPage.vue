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


const teamList = ref([] as TeamType[]);

onMounted(async () => {
  const res = await myAxios.get("/team/list", {
    params: {
      pageNum: 1,
      pageSize: 10,
    },
  });
  if (res.code === 0 && res.data) {
    teamList.value = res.data.records;
  }
});
</script>

<style scoped>
#teampage {
  padding-bottom: 50px;
}
</style>
