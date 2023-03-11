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
      ref="databaseFormRef"
      :model="databaseSettings"
      :rules="databaseFormRules"
      label-position="top"
      label-width="120px"
      status-icon
    >
      <el-form-item>
        <h3>Настройки базы данных</h3>
      </el-form-item>
      <el-form-item
        label="Хост базы данных"
        prop="host"
      >
        <el-input
          v-model="databaseSettings.host"
          placeholder="Введите хост"
        />
      </el-form-item>
      <el-form-item
        label="Имя базы данных"
        prop="name"
      >
        <el-input
          v-model="databaseSettings.name"
          placeholder="Введите имя базы данных"
        />
      </el-form-item>
      <el-form-item
        label="Порт базы данных"
        prop="port"
      >
        <el-input
          v-model="databaseSettings.port"
          placeholder="Введите порт"
        />
      </el-form-item>
      <el-form-item
        label="Имя пользователя"
        prop="username"
      >
        <el-input
          v-model="databaseSettings.username"
          placeholder="Введите имя пользователя"
        />
      </el-form-item>
      <el-form-item
        label="Пароль пользователя"
        prop="password"
      >
        <el-input
          v-model="databaseSettings.password"
          type="password"
          placeholder="Введите пароль"
          show-password
        />
      </el-form-item>
    </el-form>
    <el-form
      ref="parserVkFormRef"
      :model="parserVkSettings"
      :rules="parserVkFormRules"
      label-position="top"
      label-width="120px"
      status-icon
    >
      <el-form-item>
        <el-divider />
        <h3>Настройки парсера вк</h3>
      </el-form-item>
      <el-form-item
        label="Токен доступа"
        prop="token"
      >
        <el-input
          v-model="parserVkSettings.token"
          placeholder="Введите токен доступа"
        />
      </el-form-item>
    </el-form>
    <el-form
      ref="malingFormRef"
      :model="malingSettings"
      :rules="malingFormRules"
      label-position="top"
      label-width="120px"
      status-icon
    >
      <el-form-item>
        <el-divider />
        <h3>Настройки рассылки вк</h3>
      </el-form-item>
      <el-form-item
        label="Токен доступа"
        prop="token"
      >
        <el-input
          v-model="malingSettings.token"
          placeholder="Введите токен доступа"
        />
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item>
        <el-button
          type="danger"
          @click="resetForm(databaseFormRef, parserVkFormRef, malingFormRef)"
        >
          Очистить
        </el-button>
        <el-button
          type="primary"
          @click="submitForm(databaseFormRef, parserVkFormRef, malingFormRef)"
        >
          Сохранить
        </el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script setup lang="ts">
import {reactive, ref, onMounted} from 'vue';
import {storeToRefs} from 'pinia';
import {useRouter} from 'vue-router';
import {useTitle} from '@vueuse/core';
import type {FormInstance, FormRules} from 'element-plus';
import {ArrowLeft} from '@element-plus/icons-vue';
import {useSettingsStore} from '/@/stores/settings';

useTitle('Настройки | AiParser');

const router = useRouter();

const settingsStore = useSettingsStore();
const databaseFormRef = ref<FormInstance>();
const parserVkFormRef = ref<FormInstance>();
const malingFormRef = ref<FormInstance>();
const {databaseSettings, parserVkSettings, malingSettings} = storeToRefs(settingsStore);

const databaseFormRules = reactive<FormRules>({
  host: [{required: true, message: 'Пожалуйста введите хост', trigger: 'blur'}],
  name: [{required: true, message: 'Пожалуйста введите имя базы данных', trigger: 'blur'}],
  port: [{required: true, message: 'Пожалуйста введите порт', trigger: 'blur'}],
  username: [{required: true, message: 'Пожалуйста введите имя пользователя', trigger: 'blur'}],
  password: [{required: true, message: 'Пожалуйста введите пароль', trigger: 'blur'}],
});

const parserVkFormRules = reactive<FormRules>({
  token: [{required: true, message: 'Пожалуйста введите токен доступа', trigger: 'blur'}],
});

const malingFormRules = reactive<FormRules>({
  token: [{required: true, message: 'Пожалуйста введите токен доступа', trigger: 'blur'}],
});

const submitForm = async (
  databaseFormRef: FormInstance | undefined,
  parserVkFormRef: FormInstance | undefined,
  malingFormRef: FormInstance | undefined,
) => {
  if (databaseFormRef) {
    await databaseFormRef.validate(async (valid, fields) => {
      if (valid) {
        settingsStore.saveSettings();
      } else {
        console.log('error submit!', fields);
      }
    });
  }

  if (parserVkFormRef) {
    await parserVkFormRef.validate(async (valid, fields) => {
      if (valid) {
        settingsStore.saveSettings();
      } else {
        console.log('error submit!', fields);
      }
    });
  }

  if (malingFormRef) {
    await malingFormRef.validate(async (valid, fields) => {
      if (valid) {
        settingsStore.saveSettings();
      } else {
        console.log('error submit!', fields);
      }
    });
  }
};

const resetForm = (
  databaseFormRef: FormInstance | undefined,
  parserVkFormRef: FormInstance | undefined,
  malingFormRef: FormInstance | undefined,
) => {
  if (databaseFormRef && parserVkFormRef && malingFormRef) {
    databaseFormRef.resetFields();
    parserVkFormRef.resetFields();
    malingFormRef.resetFields();
  }
};

onMounted(async () => {
  await settingsStore.getSettings();
});
</script>

<style scoped></style>
