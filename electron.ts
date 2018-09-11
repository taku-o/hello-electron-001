'use strict';
import {app, dialog, ipcMain} from 'electron';
import * as log from 'electron-log';
import {ElectronApp} from './electron-app';
import * as menu from './electron-menu';

const elapp = new ElectronApp();

// テスト時はuserDataを差し替える
if (process.env.NODE_ENV == 'test' && process.env.userData) {
  app.setPath('userData', process.env.userData);
}

// handle uncaughtException
process.on('uncaughtException', (err: Error) => {
  log.error(err.stack);
  app.quit();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  // アプリ起動したら、最初はmainWindowを開く
  elapp.showMainWindow();
  // メニューはappの初期化が終わってから登録
  menu.initMenu();
});

// 通知を受け取ったら、対応する処理を実行する
// ウィンドウを開く
ipcMain.on('showRwWindow', (event, message: string) => {
  elapp.showRwWindow();
});
ipcMain.on('showNativeWindow', (event, message: string) => {
  elapp.showNativeWindow();
});
ipcMain.on('showConfigWindow', (event, message: string) => {
  elapp.showConfigWindow();
});

// showOpenDialog
ipcMain.on('showOpenDialog', (event, message: string) => {
  // ファイル選択ダイアログを開く
  const options = {
    title: 'select open file',
    filters: [
      {name: 'Text File', extensions: ['txt']},
    ],
  };
  const r = dialog.showOpenDialog(elapp.mainWindow, options);

  // 通知の発行元にイベントを投げ返す
  // (選択したファイルの情報を渡す)
  event.sender.send('showOpenDialogSelected', r);
});

// showWriteDialogSelected
ipcMain.on('showWriteDialog', (event, message: string) => {
  // ファイル選択ダイアログを開く
  const options = {
    title: 'select save file',
    filters: [
      {name: 'Text File', extensions: ['txt']},
    ],
  };
  const r = dialog.showSaveDialog(elapp.mainWindow, options);

  // 通知の発行元にイベントを投げ返す
  // (選択したファイルの情報を渡す)
  event.sender.send('showWriteDialogSelected', r);
});

// showResultMessage
ipcMain.on('showResultMessage', (event, message: string) => {
  const dialogOptions = {
    type: 'info',
    title: 'result',
    message: message,
    buttons: ['OK'],
    defaultId: 0,
    cancelId: 0,
  };
  const r = dialog.showMessageBox(elapp.mainWindow, dialogOptions);
});


