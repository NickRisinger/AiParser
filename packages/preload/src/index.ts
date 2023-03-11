/**
 * @module preload
 */
import {ipcRenderer} from 'electron';
import type {IpcRendererEvent} from 'electron';

export {useSettingsPromise} from './stores/settings';

export const startParsingVk = async (task: IParsingTask) =>
  await ipcRenderer.invoke('parsing-vk', task);

export const chengeStatusParsingVk = (
  callback: (event: IpcRendererEvent, data: Partial<IParsingTask>) => void,
) => ipcRenderer.on('parsing-vk-response', callback);
