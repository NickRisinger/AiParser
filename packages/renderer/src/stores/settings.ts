import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import {useSettingsPromise} from '#preload';

export const useSettingsStore = defineStore('counter', () => {
  const databaseSettings = ref({
    host: '',
    name: '',
    port: '',
    username: '',
    password: '',
  });

  const parserVkSettings = ref({
    token: '',
  });

  const malingSettings = ref({
    token: '',
  });

  const isFilled = computed(
    () =>
      databaseSettings.value.host != '' &&
      databaseSettings.value.name != '' &&
      databaseSettings.value.password != '' &&
      databaseSettings.value.port != '' &&
      databaseSettings.value.username != '' &&
      parserVkSettings.value.token != '',
  );

  const saveSettings = async () => {
    const store = await useSettingsPromise;
    store.set('database', JSON.parse(JSON.stringify(databaseSettings.value)));
    store.set('parserVk', JSON.parse(JSON.stringify(parserVkSettings.value)));
    store.set('maling', JSON.parse(JSON.stringify(malingSettings.value)));
  };

  const getSettings = async () => {
    const store = await useSettingsPromise;
    databaseSettings.value = store.get('database') || {
      host: '',
      name: '',
      port: '',
      username: '',
      password: '',
    };
    parserVkSettings.value = store.get('parserVk') || {token: ''};
    malingSettings.value = store.get('maling') || {token: ''};
  };

  return {databaseSettings, parserVkSettings, malingSettings, saveSettings, getSettings, isFilled};
});
