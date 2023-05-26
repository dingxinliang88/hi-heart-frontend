<template>
  <div id="newtagpage">
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      选择父标签
    </van-divider>

    <van-cell-group inset v-for="tag in tagList">
      <van-cell
        :title="tag.parentTagName"
        value="👉点我添加新的标签👈"
        @click="showAdd(tag.parentTagId)"
        size="large"
        icon="fire-o"
      />
      <template v-for="childTagName in tag.childTagNameList">
        <van-tag type="primary" round class="fancy-tag">
          <van-icon name="star" class="tag-icon"></van-icon>
          {{ childTagName }}
        </van-tag>
      </template>
      <van-divider dashed />
    </van-cell-group>
    <van-popup
      v-model:show="show"
      position="center"
      :style="{ height: '30%' }"
      closeable
      round
      @click-overlay="onClickOverlay"
      @click-close-icon="onClickCloseIcon"
    >
      <van-field
        v-model="newTagName"
        label="标签名"
        size="large"
        placeholder="请输入新标签名"
      />
      <div style="padding: 16px; margin-top: 20px">
        <van-button type="success" block @click="doAddTag">添加</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import myAxios from "../../plugins/myAxios";
import { MyTagType } from "../../models/tag";
import { showFailToast, showSuccessToast } from "vant";

let originTagList: MyTagType[] = [];
const tagList = ref(originTagList);

const loadTagList = async () => {
  const res = await myAxios.get("/tag/tag_list");

  if (res.data) {
    tagList.value = res.data;
  }
};

onMounted(() => {
  loadTagList();
});

const newTagName = ref("");
const selectedParentId = ref(0);
const showAdd = (parentId: number) => {
  show.value = true;
  selectedParentId.value = parentId;
};

const doAddTag = async () => {
  if (newTagName.value === "") {
    showFailToast("标签名不能为空！");
    return;
  }
  const tagAddData = {
    parentId: selectedParentId.value,
    tagName: newTagName.value,
  };
  const res = await myAxios.post("/tag/add", tagAddData);
  if (res.code === 0 && res.data) {
    showSuccessToast("添加成功");
    onClickOverlay();
    loadTagList();
  } else {
    showFailToast(res.message);
  }
};

const show = ref(false);
const onClickOverlay = () => {
  show.value = false;
  newTagName.value = "";
};
const onClickCloseIcon = () => {
  onClickOverlay();
};
</script>

<style scoped>
.fancy-tag {
  background-color: #ffefd5;
  color: #ff4500;
  border: solid #ca660d;
  border-width: 2px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  font-size: 1px;
  margin: 6px;
  padding: 8px 10px;
  text-shadow: 1px 1px 1px rgba(255, 69, 0, 0.3);
}

.tag-icon {
  font-size: 15px;
  margin-right: 6px;
}

#newtagpage {
  padding-bottom: 50px;
}
</style>
