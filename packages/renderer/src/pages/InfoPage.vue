<template>
  <el-main>
    <el-button
      type="primary"
      :icon="ArrowLeft"
      @click="router.back()"
    >
      Назад
    </el-button>
    <el-divider />
  </el-main>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {useTitle} from '@vueuse/core';
import {ArrowLeft} from '@element-plus/icons-vue';

useTitle('Информация | AiParser');

const router = useRouter();
</script>

<style scoped></style>
