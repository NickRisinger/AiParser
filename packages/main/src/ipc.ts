import {ipcMain} from 'electron';
import type {IpcMainInvokeEvent} from 'electron';

ipcMain.handle('parsing-vk', async (event: IpcMainInvokeEvent, data: IParsingTask) => {
  console.log('data: ', data);
  setTimeout(() => {
    event.sender.send('parsing-vk-response', {...data, status: false});
  }, 3000);
  //   return data;
});
