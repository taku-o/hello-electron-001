'use strict';
import {app, BrowserWindow} from 'electron';
import * as localShortcut from 'electron-localshortcut';
import * as log from 'electron-log';

export class ElectronApp implements ollflow.IElectronApp {
  // 最初に開くウィンドウ
  mainWindow: Electron.BrowserWindow;
  // ローカルファイルを読み書きするウィンドウ
  rwWindow: Electron.BrowserWindow;
  // ネイティブな処理を実行するウィンドウ
  nativeWindow: Electron.BrowserWindow;
  // userDataのデータを読み書きするウィンドウ
  configWindow: Electron.BrowserWindow;

  showMainWindow(): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.show();
      this.mainWindow.focus();
      return;
    }

    this.mainWindow = new BrowserWindow({
      width: 600,
      height: 600,
      acceptFirstMouse: true,
      show: false, // show at did-finish-load event
      webPreferences: {
        devTools: true, // developer toolを有効にする
      },
    });
    this.mainWindow.loadURL(`file://${__dirname}/window-main.html`);

    // ショートカットキー
    // Command+Qでアプリを閉じる
    localShortcut.register(this.mainWindow, 'Command+Q', () => {
      app.quit();
    });

    // event
    this.mainWindow.webContents.on('did-finish-load', () => {
      this.mainWindow.show();
      this.mainWindow.focus();
    });
    this.mainWindow.on('close', () => {
    });
    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });
    this.mainWindow.on('unresponsive', () => {
      log.warn('mainWindow is unresponsive.');
    });
    this.mainWindow.webContents.on('crashed', () => {
      log.error('mainWindow is crashed.');
    });
  }

  showRwWindow(): void {
    if (this.rwWindow && !this.rwWindow.isDestroyed()) {
      this.rwWindow.show();
      this.rwWindow.focus();
      return;
    }

    this.rwWindow = new BrowserWindow({
      parent: this.mainWindow, // 親ウィンドウが閉じたら子も閉じる
      width: 400,
      height: 400,
      acceptFirstMouse: true,
      show: false, // show at did-finish-load event
      webPreferences: {
        devTools: true,
      },
    });
    this.rwWindow.loadURL(`file://${__dirname}/window-readwrite.html`);

    this.rwWindow.webContents.on('did-finish-load', () => {
      this.rwWindow.show();
      this.rwWindow.focus();
    });
    this.rwWindow.on('closed', () => {
      this.rwWindow = null;
    });
    this.rwWindow.on('unresponsive', () => {
      log.warn('rwWindow is unresponsive.');
    });
    this.rwWindow.webContents.on('crashed', () => {
      log.error('rwWindow is crashed.');
    });
  }

  showNativeWindow(): void {
    if (this.nativeWindow && !this.nativeWindow.isDestroyed()) {
      this.nativeWindow.show();
      this.nativeWindow.focus();
      return;
    }

    this.nativeWindow = new BrowserWindow({
      parent: this.mainWindow,
      width: 400,
      height: 400,
      acceptFirstMouse: true,
      show: false, // show at did-finish-load event
      webPreferences: {
        devTools: true,
      },
    });
    this.nativeWindow.loadURL(`file://${__dirname}/window-native.html`);

    this.nativeWindow.webContents.on('did-finish-load', () => {
      this.nativeWindow.show();
      this.nativeWindow.focus();
    });
    this.nativeWindow.on('closed', () => {
      this.nativeWindow = null;
    });
    this.nativeWindow.on('unresponsive', () => {
      log.warn('nativeWindow is unresponsive.');
    });
    this.nativeWindow.webContents.on('crashed', () => {
      log.error('nativeWindow is crashed.');
    });
  }

  showConfigWindow(): void {
    if (this.configWindow && !this.configWindow.isDestroyed()) {
      this.configWindow.show();
      this.configWindow.focus();
      return;
    }

    this.configWindow = new BrowserWindow({
      parent: this.mainWindow,
      width: 400,
      height: 400,
      acceptFirstMouse: true,
      show: false, // show at did-finish-load event
      webPreferences: {
        devTools: true,
      },
    });
    this.configWindow.loadURL(`file://${__dirname}/window-config.html`);

    this.configWindow.webContents.on('did-finish-load', () => {
      this.configWindow.show();
      this.configWindow.focus();
    });
    this.configWindow.on('closed', () => {
      this.configWindow = null;
    });
    this.configWindow.on('unresponsive', () => {
      log.warn('configWindow is unresponsive.');
    });
    this.configWindow.webContents.on('crashed', () => {
      log.error('configWindow is crashed.');
    });
  }
}
