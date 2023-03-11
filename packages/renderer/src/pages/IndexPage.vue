<template>
  <el-main>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card
          shadow="hover"
          @click="router.push({name: 'parserVk'})"
        >
          <el-icon><CopyDocument /></el-icon>
          <span>Парсер Вконтакте</span>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card
          shadow="hover"
          @click="openDisablePart"
        >
          Парсер Инстаграм
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card
          shadow="hover"
          @click="openDisablePart"
        >
          <el-icon><Message /></el-icon>
          <span>Рассылка Вконтакте</span>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card
          shadow="hover"
          @click="openDisablePart"
        >
          <el-icon><InfoFilled /></el-icon>
          <span>Информация</span>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card
          shadow="hover"
          @click="router.push({name: 'settings'})"
        >
          <el-icon><Setting /></el-icon>
          <span>Настройки</span>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {useTitle} from '@vueuse/core';
import {ElMessageBox} from 'element-plus';
import {Setting, InfoFilled, CopyDocument, Message} from '@element-plus/icons-vue';

useTitle('Главная страница | AiParser');

const router = useRouter();

const openDisablePart = () => {
  ElMessageBox.alert('Раздел еще в разработке, но скоро появится!', 'Упссс....', {
    confirmButtonText: 'Ок',
  });
};
</script>

<style scoped></style>
