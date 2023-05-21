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
</template>

<script setup lang="ts">
import { ref } from "vue";

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
 * 取消搜索
 */
const onCancel = () => {
  searchText.value = "";
  tagList.value = originTagList;
};

const show = ref(true);
const doClose = (tag: string) => {
  activeIds.value = activeIds.value.filter((item) => {
    return item !== tag;
  });
};

const searchText = ref("");

const activeIds = ref([]);
const activeIndex = ref(0);
const originTagList = [
  {
    text: "学习目标",
    children: [
      { text: "Java", id: "Java" },
      { text: "C++", id: "C++" },
      { text: "Python", id: "Python" },
    ],
  },
  {
    text: "目标",
    children: [
      { text: "考研", id: "考研" },
      { text: "工作", id: "工作" },
    ],
  },
  {
    text: "个人状态",
    children: [
      { text: "活泼", id: "活泼" },
      { text: "悠闲自在", id: "悠闲自在" },
    ],
  },
];

let tagList = ref(originTagList);
</script>

<style scoped></style>
