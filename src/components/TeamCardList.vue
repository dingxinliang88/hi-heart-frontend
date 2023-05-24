<template>
  <template v-for="team in teamList">
    <van-card
      :desc="team.description"
      :title="team.teamName"
      :thumb="team.teamAvatar"
    >
      <template #tags>
        <van-tag
          class="tag"
          plain
          type="warning"
          size="medium"
          style="margin-right: 8px; margin-top: 8px"
        >
          队长：{{ team.leader.userName }}(id: {{ team.leaderId }})
        </van-tag>
        <van-tag
          class="tag"
          plain
          color="#ffe1e1"
          text-color="#ad0000"
          size="medium"
          style="margin-right: 8px; margin-top: 8px"
        >
          队伍人数：{{ team.joinNum }} / {{ team.maxNum }}
        </van-tag>
        <van-tag
          class="tag"
          plain
          color="#ffe1e1"
          text-color="#ad0000"
          size="medium"
          style="margin-right: 8px; margin-top: 8px"
        >
          {{ teamStatusEnums[team.status] }}
        </van-tag>
        <van-tag
          class="tag"
          plain
          color="#ffe1e1"
          text-color="#ad0000"
          size="medium"
          style="margin-right: 8px; margin-top: 8px"
        >
          创建时间： {{ parseDate(team.createTime) }}
        </van-tag>
      </template>
      <template #footer>
        <van-button round size="small" type="danger">举报</van-button>
        <van-button round size="small" type="primary">加入</van-button>
      </template>
    </van-card>
  </template>
</template>

<script setup lang="ts">
import { TeamType } from "../models/team";
import { teamStatusEnums } from "../constants/team";
import { parseDate } from "../service/date";

interface teamCardListProps {
  teamList: TeamType[];
}

withDefaults(defineProps<teamCardListProps>(), {
  //@ts-ignore
  teamList: [] as TeamType[],
});
</script>

<style scoped>
.tag {
  display: inline-block;
  margin-top: auto;
  margin-bottom: auto;
}
.button {
  padding-top: auto;
}
</style>
