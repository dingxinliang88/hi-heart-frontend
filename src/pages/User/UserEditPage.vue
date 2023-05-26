<template>
  <van-form @submit="onSubmit">
    <van-field
      v-if="
        editUser.editKey !== 'userAvatar' &&
        editUser.editKey !== 'userProfile' &&
        editUser.editKey !== 'gender'
      "
      v-model="editUser.curval"
      :name="editUser.editKey"
      :label="editUser.editName"
      :placeholder="`请输入${editUser.editName}`"
    />

    <van-cell-group inset v-if="editUser.editKey === 'userProfile'">
      <van-field
        v-model="editUser.curval"
        rows="2"
        autosize
        :label="editUser.editName"
        type="textarea"
        maxlength="255"
        placeholder="请输入简介"
        show-word-limit
      />
    </van-cell-group>

    <template v-if="editUser.editKey === 'userAvatar'">
      <van-field name="radio" label="头像">
        <template #input>
          <van-radio-group v-model="avatarIndex" direction="horizontal">
            <van-radio name="0" />
            <van-radio name="1" />
            <van-radio name="2" />
            <van-radio name="3" />
            <van-radio name="4" />
            <van-radio name="5" />
            <van-radio name="6" />
          </van-radio-group>
        </template>
      </van-field>
      <div style="display: flex; justify-content: center; align-items: center">
        <van-image
          round
          width="10rem"
          height="10rem"
          fit="cover"
          position="center"
          :src="avatarArr[Number(avatarIndex)]"
        />
      </div>
    </template>

    <template v-if="editUser.editKey === 'gender'">
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="genderIdx" direction="horizontal">
            <van-radio name="0">女</van-radio>
            <van-radio name="1">男</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </template>

    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "../../plugins/myAxios";
import { showFailToast, showSuccessToast } from "vant";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();

const editUser = ref({
  id: route.query.id,
  editKey: route.query.editKey as string,
  curval: route.query.curVal as any,
  editName: route.query.editName as string,
});

const oldVal = editUser.value.curval;

const onSubmit = async () => {
  // 更新的是头像
  if (editUser.value.editKey === "userAvatar") {
    editUser.value.curval = avatarArr[Number(avatarIndex.value)];
  }
  // 更新的是性别
  else if (editUser.value.editKey === "gender") {
    editUser.value.curval = Number(genderIdx.value);
  }

  if (oldVal === editUser.value.curval) {
    showSuccessToast("没有更改信息哦～～");
    return;
  }

  const updateData = {
    [editUser.value.editKey]: editUser.value.curval,
    id: editUser.value.id,
  };

  // console.log(updateData);

  const res = await myAxios.put("/user/update", updateData);
  if (res.code === 0) {
    showSuccessToast("修改成功");
    router.back();
  } else {
    showFailToast(res.message);
  }
};

onMounted(() => {
  if (editUser.value.editKey === "userAvatar") {
    for (let i = 0; i < avatarArr.length; i++) {
      if (avatarArr[i] === editUser.value.curval) {
        avatarIndex.value = String(i);
        break;
      }
    }
  } else if (editUser.value.editKey === "gender") {
    genderIdx.value = String(editUser.value.curval);
  }
});

const avatarIndex = ref("5");
const avatarArr = [
  "https://regengbaike.com/uploads/20230222/1bff61de34bdc7bf40c6278b2848fbcf.jpg",
  "https://img.58tg.com/up/allimg/tx29/08151048279757843.jpg",
  "https://img.58tg.com/up/allimg/tx29/07010018221735575.jpg",
  "https://upen.caup.net/ai_pics_mj/202303/1677952366325269.jpg",
  "https://p.qqan.com/up/2022-9/16635499767793089.jpg",
  "https://photo.16pic.com/00/53/26/16pic_5326745_b.jpg",
  "https://img01.yohoboys.com/contentimg/2018/11/22/13/0187be5a52edcdc999f749b9e24c7815fb.jpg",
];

const genderIdx = ref("0");
const genderArr = ["女", "男"];
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
