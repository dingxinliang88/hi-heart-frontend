<template>
  <template v-for="team in props.teamList">
    <van-card
      :tag="team.teamId.toString()"
      :desc="team.description"
      :title="team.teamName"
      :thumb="team.teamAvatar"
    >
      <template #tags>
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
          队伍人数：{{ team.joinNum }} / {{ team.maxNum }}
        </van-tag>
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
          创建时间： {{ parseDate(team.createTime) }}
        </van-tag>
      </template>
      <template #footer>
        <van-button
          round
          size="small"
          type="primary"
          @click="doShowTeam(team.teamId)"
          >查看</van-button
        >
        <van-button
          round
          size="small"
          type="warning"
          @click="doEditTeam(team.teamId)"
          v-if="team.leaderId === loginUser.id"
          >更新</van-button
        >
        <van-button
          round
          size="small"
          type="success"
          @click="doJoinTeam(team)"
          v-if="!team.hasJoin"
          >加入</van-button
        >
        <van-button
          round
          size="small"
          type="danger"
          @click="doQuitTeam(team.teamId)"
          v-if="team.hasJoin && loginUser.id !== team.leaderId"
          >退出</van-button
        >
        <van-button
          round
          size="small"
          type="danger"
          @click="doDeleteTeam(team.teamId)"
          v-if="loginUser.id === team.leaderId"
          >解散</van-button
        >
        <van-button
          round
          size="small"
          type="primary"
          @click="doTransferTeam(team.teamId)"
          v-if="loginUser.id === team.leaderId && team.joinNum >= 2"
          >转让</van-button
        >
      </template>
    </van-card>
  </template>

  <van-empty v-if="!teamList || !teamList.length" description="结果为空" />

  <van-dialog
    v-model:show="show"
    title="确认加入吗？"
    show-cancel-button
    @confirm="joinTeam"
    @cancel="doCancle"
  >
    <template #default>
      <van-field
        v-model="teamPassword"
        v-if="showPassword"
        type="password"
        name="密码"
        label="入队密码"
        placeholder="请填写密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </template>
  </van-dialog>
</template>

<script setup lang="ts">
import { TeamType } from "../models/team";
import { teamStatusEnums } from "../constants/team";
import { parseDate } from "../service/date";
import { getLoginUser } from "../service/user";
import { onMounted, ref } from "vue";
import { UserVO } from "../models/user";
import { useRouter } from "vue-router";
import myAxios from "../plugins/myAxios";
import { showConfirmDialog, showFailToast, showSuccessToast } from "vant";

interface teamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<teamCardListProps>(), {
  //@ts-ignore
  teamList: [] as TeamType[],
});

const loginUser = ref({} as UserVO);
onMounted(async () => {
  loginUser.value = await getLoginUser();
});

const router = useRouter();
const doEditTeam = (teamId: number) => {
  console.log("teamId,", teamId);

  router.push({
    path: "/team/edit",
    query: {
      teamId,
    },
  });
};

const show = ref(false);
const showPassword = ref(false);
const teamPassword = ref("");
const joinTeamId = ref(1);
const doJoinTeam = (team: TeamType) => {
  show.value = true;
  if (team.status === 2) {
    showPassword.value = true;
  }
  joinTeamId.value = team.teamId;
};
const doCancle = () => {
  showPassword.value = false;
  teamPassword.value = "";
  show.value = false;
};
/**
 * 加入队伍
 */
const joinTeam = async () => {
  const joinTeamData = {
    teamId: joinTeamId.value,
    teamPassword: teamPassword.value,
  };

  const res = await myAxios.post("/team/join", joinTeamData);
  if (res.code === 0 && res.data) {
    showSuccessToast("加入成功");
    router.replace("/search/my/team?type=0");
  } else {
    showFailToast(res.message);
  }
  doCancle();
};

/**
 * 退出队伍
 * @param teamId 队伍id
 */
const doQuitTeam = (teamId: number) => {
  showConfirmDialog({
    title: "确认退出？",
  })
    .then(async () => {
      // on confirm
      const res = await myAxios.post("/team/quit", {
        teamId,
      });
      if (res.data) {
        showSuccessToast("退出成功");
        router.replace("/search/my/team?type=0");
      }
    })
    .catch(() => {
      // on cancel
    });
};

/**
 * 解散队伍
 * @param teamId 队伍id
 */
const doDeleteTeam = (teamId: number) => {
  showConfirmDialog({
    title: "确认解散？",
  })
    .then(async () => {
      // on confirm
      const res = await myAxios.delete("/team/delete", {
        data: {
          id: teamId,
        },
      });
      if (res.data) {
        showSuccessToast("解散成功");
        router.replace("/search/my/team?type=1");
      }
    })
    .catch(() => {
      // on cancel
    });
};

/**
 * 转让队伍
 * @param teamId 队伍id
 */
const doTransferTeam = (teamId: number) => {
  router.push({
    path: "/team/transfer",
    query: {
      teamId,
    },
  });
};

const doShowTeam = (teamId: number) => {
  router.push({
    path: "/team/join",
    query: {
      teamId,
    },
  });
};
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
