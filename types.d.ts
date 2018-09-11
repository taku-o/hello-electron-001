declare namespace ollflow {
  export interface IElectronApp {
    mainWindow: Electron.BrowserWindow;
    rwWindow: Electron.BrowserWindow;
    nativeWindow: Electron.BrowserWindow;
    configWindow: Electron.BrowserWindow;

    showMainWindow(): void;
    showRwWindow(): void;
    showNativeWindow(): void;
    showConfigWindow(): void;
  }
}
