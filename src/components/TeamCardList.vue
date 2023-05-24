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
        <van-button
          round
          size="small"
          type="warning"
          @click="doEditTeam(team.id)"
          v-if="team.leaderId === loginUser.id"
          >更新</van-button
        >
        <van-button round size="small" type="success" @click="doJoinTeam"
          >加入</van-button
        >
      </template>
    </van-card>
  </template>
  <van-empty v-if="!teamList || !teamList.length" description="结果为空" />
</template>

<script setup lang="ts">
import { TeamType } from "../models/team";
import { teamStatusEnums } from "../constants/team";
import { parseDate } from "../service/date";
import { getLoginUser } from "../service/user";
import { onMounted, ref } from "vue";
import { UserVO } from "../models/user";
import { useRouter } from "vue-router";

interface teamCardListProps {
  teamList: TeamType[];
}

const loginUser = ref({} as UserVO);
onMounted(async () => {
  loginUser.value = await getLoginUser();
});

const router = useRouter();
const doEditTeam = (teamId: number) => {
  router.push({
    path: "/team/edit",
    query: {
      teamId,
    },
  });
};

const doJoinTeam = () => {
  // todo 显示弹出层，输入密码，还是直接加入
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
