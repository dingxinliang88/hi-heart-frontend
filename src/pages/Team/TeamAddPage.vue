<template>
  <van-form @submit="onSubmit" id="content">
    <van-cell-group inset>
      <van-field
        v-model="teamCreateData.teamName"
        name="队伍名"
        label="队伍名"
        placeholder="队伍名"
        maxlength="20"
        show-word-limit
        :rules="[{ required: true, message: '请填写队伍名' }]"
      />
      <van-field
        v-model="teamCreateData.description"
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
            v-model="teamCreateData.maxNum"
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
        v-if="Number(teamCreateData.status) == 2"
        v-model="teamCreateData.teamPassword"
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
        创建队伍
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import myAxios from "../../plugins/myAxios";
import { showFailToast, showSuccessToast } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();

const teamCreateData = ref({
  description: "",
  maxNum: 5,
  status: 0,
  teamAvatar: "",
  teamName: "",
  teamPassword: "",
});

const status = ref("0");

const avatarIndex = ref("0");
const avatarArr = ref([
  "https://regengbaike.com/uploads/20230222/1bff61de34bdc7bf40c6278b2848fbcf.jpg",
  "https://i02piccdn.sogoucdn.com/df39cd08e64e1fde",
  "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
]);
const onSubmit = async () => {
  const teamData = {
    ...teamCreateData.value,
    status: Number(status.value),
    teamAvatar: avatarArr.value[Number(avatarIndex.value)],
  };
  const res = await myAxios.post("/team/create", teamData);
  if (res.code === 0 && res.data) {
    showSuccessToast("创建成功");
    router.push({
      path: "/team",
      replace: true,
    });
  } else {
    showFailToast("创建失败");
  }
};
</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
