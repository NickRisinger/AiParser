<template>
  <component :is="route.meta.layoutComponent">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import {useRoute} from 'vue-router';
import {useParserVkStore} from '/@/stores/parserVk';
import {useSettingsStore} from '/@/stores/settings';
import {chengeStatusParsingVk} from '#preload';

const route = useRoute();

const parserVkStore = useParserVkStore();
const settingsStore = useSettingsStore();

chengeStatusParsingVk((_event, data) => {
  parserVkStore.updateTaskParsing(data);
});

onMounted(async () => {
  await settingsStore.getSettings();
});
</script>

<style scoped></style>
