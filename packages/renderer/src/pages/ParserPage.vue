<template>
  <el-main>
    <el-button
      type="primary"
      :icon="ArrowLeft"
      @click="router.back()"
    >
      Назад
    </el-button>
    <el-form
      ref="parserFormRef"
      :model="parserForm"
      :rules="parserFormRules"
    >
      <el-form-item prop="groupId">
        <el-divider />
        <el-input
          v-model="parserForm.groupId"
          type="number"
          placeholder="Введите ID группы"
        />
      </el-form-item>
      <el-form-item prop="tableName">
        <el-input
          v-model="parserForm.tableName"
          placeholder="Введите название таблицы"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm(parserFormRef)"
        >
          Парсить
        </el-button>
      </el-form-item>
    </el-form>
    <div>
      <ul>
        <li
          v-for="item in parserVkStore.parsersTasks"
          :key="item.groupId"
        >
          {{ item.groupId }} - {{ item.tableName }} - Ошибка 21642
        </li>
      </ul>
    </div>
  </el-main>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useTitle} from '@vueuse/core';
import type {FormInstance, FormRules} from 'element-plus';
import {ArrowLeft} from '@element-plus/icons-vue';
import {useParserVkStore} from '/@/stores/parserVk';

useTitle('Парсер');

const router = useRouter();

const parserVkStore = useParserVkStore();

const parserForm = ref({
  groupId: '',
  tableName: '',
});
const parserFormRef = ref<FormInstance>();

const parserFormRules = reactive<FormRules>({
  groupId: [{required: true, message: 'Пожалуйста введите ID группы', trigger: 'blur'}],
  tableName: [{required: true, message: 'Пожалуйста введите название таблицы', trigger: 'blur'}],
});

const submitForm = async (parserFormRef: FormInstance | undefined) => {
  if (parserFormRef) {
    await parserFormRef.validate(async (valid, fields) => {
      if (valid) {
        parserVkStore.addTaskParsing(Number(parserForm.value.groupId), parserForm.value.tableName);
        parserFormRef.resetFields();
      } else {
        console.log('error submit!', fields);
      }
    });
  }
};
</script>

<style scoped></style>
