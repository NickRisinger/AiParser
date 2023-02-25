import {defineStore} from 'fs-nano-store';
import {resolveStoreFilepath} from 'electron-nano-store';
import {app} from 'electron';

export const useSettingsStore = await defineStore(
  resolveStoreFilepath('settings', app.getPath('userData')),
);
