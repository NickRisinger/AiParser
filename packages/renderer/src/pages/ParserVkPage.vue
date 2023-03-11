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
    <el-form
      ref="parserFormRef"
      :model="parserForm"
      :rules="parserFormRules"
    >
      <el-form-item prop="groupId">
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
    <el-divider />
    <el-table
      :data="parserVkStore.parsersTasks"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="Дата"
        :formatter="formatter"
      />
      <el-table-column
        prop="groupId"
        label="Id группы"
      />
      <el-table-column
        prop="tableName"
        label="Имя таблицы"
      />
      <el-table-column
        prop="status"
        label="Статус"
      />
      <template #empty>
        <span>Нет данных</span>
      </template>
    </el-table>
  </el-main>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import {storeToRefs} from 'pinia';
import {useRouter} from 'vue-router';
import {useTitle} from '@vueuse/core';
import type {FormInstance, FormRules} from 'element-plus';
import {ElMessageBox} from 'element-plus';
import {ArrowLeft} from '@element-plus/icons-vue';
import {useParserVkStore} from '/@/stores/parserVk';
import {useSettingsStore} from '/@/stores/settings';

useTitle('Парсер вконтакте | AiParser');

const router = useRouter();

const parserVkStore = useParserVkStore();
const settingsStore = useSettingsStore();

const {isFilled} = storeToRefs(settingsStore);

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
        if (isFilled.value) {
          parserVkStore.addTaskParsing(
            Number(parserForm.value.groupId),
            parserForm.value.tableName,
          );
          parserFormRef.resetFields();
        } else {
          ElMessageBox.confirm(
            'Для того чтоб пользоваться парсером, нужно заполнить все поля в настройках!',
            'Внимание!',
            {
              confirmButtonText: 'Ок',
              cancelButtonText: 'Прейти к настройкам',
              type: 'warning',
            },
          ).catch(() => {
            router.push({name: 'settings'});
          });
        }
      } else {
        console.log('error submit!', fields);
      }
    });
  }
};

// eslint-disable-next-line no-undef
const formatter = (row: IParsingTask) => {
  return row.date.toLocaleString('ru');
};
</script>

<style scoped></style>
