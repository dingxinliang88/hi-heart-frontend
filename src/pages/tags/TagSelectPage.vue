<template>
  <form action="/">
    <van-search
      v-model="searchText"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <van-divider
    v-if="!activeIds.length"
    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    请选择标签
  </van-divider>

  <van-row style="padding: 0 16px">
    <van-col v-for="tag in activeIds" span="6">
      <van-tag
        :show="show"
        closeable
        size="medium"
        type="primary"
        @close="doClose(tag)"
      >
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
    v-model:active-id="activeIds"
    v-model:main-active-index="activeIndex"
    :items="tagList"
  />

  <div style="padding: 16px">
    <van-button block type="primary" @click="doSearchResult">选好了</van-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import myAxios from "../../plugins/myAxios";
import { onMounted } from "vue";
import { showFailToast, showSuccessToast } from "vant";
import { UserVO } from "../../models/user";
import { getLoginUser } from "../../service/user";

/**
 * 搜索过滤标签
 */
const onSearch = () => {
  tagList.value = originTagList.map((parentTag) => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = { ...parentTag };
    tempParentTag.children = tempChildren.filter((item) =>
      item.text.includes(searchText.value)
    );

    return tempParentTag;
  });
};
/**
 * 取消搜索标签
 */
const onCancel = () => {
  searchText.value = "";
  activeIds.value = [];
  tagList.value = originTagList;
};

const show = ref(true);
const doClose = (tag: string) => {
  activeIds.value = activeIds.value.filter((item) => {
    return item !== tag;
  });
};

const router = useRouter();

const loginUser = ref({} as UserVO);
onMounted(async () => {
  loginUser.value = await getLoginUser();
});

const doSearchResult = async () => {
  const tagData = {
    id: loginUser.value.id,
    tagList: activeIds.value,
  };
  console.log(activeIds.value);
  const res = await myAxios.put("/user/update", tagData);
  if (res.data) {
    showSuccessToast("更新成功");
    router.push("/");
  } else {
    showFailToast(res.message);
  }
};

const searchText = ref("");

const activeIds = ref([]);
const activeIndex = ref(0);

let tagVOListFromBackend = [
  {
    parentTagName: "",
    childTagNameList: [],
  },
];

let originTagList: any[] = [];
const tagList = ref(originTagList);

/**
 * 加载标签列表
 */
const loadTagList = async () => {
  const res = await myAxios.get("/tag/tag_list");
  tagVOListFromBackend = res.data;
  console.log(tagVOListFromBackend);

  originTagList = tagVOListFromBackend.map((item) => {
    const parentTag = item.parentTagName;
    const childrenTags = item.childTagNameList.slice(1).map((child, _) => ({
      text: child,
      id: child,
    }));
    return {
      text: parentTag,
      children: childrenTags,
    };
  });

  tagList.value = originTagList;
};

onMounted(async () => {
  loadTagList();
});
</script>

<style scoped></style>
