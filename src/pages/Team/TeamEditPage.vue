<template>
  <van-form @submit="onSubmit" id="content">
    <van-cell-group inset>
      <van-field
        v-model="teamUpdateData.teamName"
        name="队伍名"
        label="队伍名"
        placeholder="队伍名"
        maxlength="20"
        show-word-limit
        :rules="[{ required: true, message: '请填写队伍名' }]"
      />
      <van-field
        v-model="teamUpdateData.description"
        name="队伍描述"
        label="队伍描述"
        type="textarea"
        autosize
        rows="5"
        maxlength="512"
        show-word-limit
        placeholder="队伍描述"
      />
      <van-field name="stepper" label="队伍最大人数">
        <template #input>
          <van-stepper
            v-model="teamUpdateData.maxNum"
            min="2"
            max="20"
            integer
          />
        </template>
      </van-field>
      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-if="Number(status) == 2"
        v-model="teamUpdateData.teamPassword"
        type="password"
        name="加入队伍密码"
        label="加入队伍密码"
        placeholder="加入队伍密码"
        :rules="[{ required: true, message: '请填写加入队伍密码' }]"
      />
      <van-field name="radio" label="队伍头像">
        <template #input>
          <van-radio-group v-model="avatarIndex" direction="horizontal">
            <van-radio name="0">1</van-radio>
            <van-radio name="1">2</van-radio>
            <van-radio name="2">3</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-image
        style="margin-left: auto"
        round
        width="5rem"
        height="5rem"
        fit="cover"
        position="center"
        :src="avatarArr[Number(avatarIndex)]"
      />
    </van-cell-group>

    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        修改队伍
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Team } from "../../models/team";
import { useRoute, useRouter } from "vue-router";
import { showFailToast, showSuccessToast } from "vant";
import myAxios from "../../plugins/myAxios";

const teamUpdateData = ref({} as Team);

const route = useRoute();
const router = useRouter();

const teamId = route.query.teamId;

onMounted(async () => {
  if (Number(teamId) <= 0) {
    showFailToast("队伍信息加载失败");
    return;
  }

  const res = await myAxios.get("/team/query/id", {
    params: {
      id: teamId,
    },
  });

  if (res.code === 0 && res.data) {
    teamUpdateData.value = res.data;
    status.value = res.data.status + "";
  } else {
    showFailToast("队伍信息加载失败");
  }
});

const status = ref("0");

const avatarIndex = ref("0");
const avatarArr = ref([
  "https://regengbaike.com/uploads/20230222/1bff61de34bdc7bf40c6278b2848fbcf.jpg",
  "https://i02piccdn.sogoucdn.com/df39cd08e64e1fde",
  "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
]);
const onSubmit = async () => {
  if (status.value !== "2") {
    teamUpdateData.value.teamPassword = "";
  }
  const teamData = {
    teamId: Number(teamId),
    ...teamUpdateData.value,
    status: Number(status.value),
    teamAvatar: avatarArr.value[Number(avatarIndex.value)],
  };
  const updateRes = await myAxios.put("/team/update", teamData);

  if (updateRes.code === 0 && updateRes.data) {
    showSuccessToast("更新成功");
    router.back();
  } else {
    showFailToast("更新失败");
  }
};
</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
