<template>
  Team
  <div id="teampage">
    <van-button round icon="plus" type="primary" @click="addTeam" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const addTeam = () => {
  router.push("/team/add");
};
</script>

<style scoped></style>
