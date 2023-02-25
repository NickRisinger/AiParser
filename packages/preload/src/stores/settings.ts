import {defineStore} from 'electron-nano-store';

type SettingsStore = {
  database: {
    host: string;
    port: string;
    username: string;
    password: string;
  };
  parserVk: {
    token: string;
  };
  maling: {
    token: string;
  };
};

export const useSettingsPromise = defineStore<SettingsStore>('settings');
