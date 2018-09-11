'use strict';
import {app, Menu} from 'electron';

export function initMenu() {
  // メニュー
  const menuList = [
    {
      label: 'ollfrow',
      submenu: [
        {
          role: 'services',
          submenu: [],
        },
        {type: 'separator'},
        {
          role: 'quit',
          accelerator: 'Command+Q',
        },
      ],
    },
    {
      label: '編集',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'},
        {type: 'separator'},
        {label: 'Speech',
          submenu: [
            {role: 'startspeaking'},
            {role: 'stopspeaking'},
          ],
        },
      ],
    },
    {
      label: '表示',
      submenu: [
        {role: 'reload'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'},
        {role: 'toggledevtools'},
      ],
    },
    {
      label: 'ウインドウ',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize',
        },
        {
          label: 'Zoom',
          role: 'zoom',
        },
        {type: 'separator'},
        {
          label: 'Bring All to Front',
          role: 'front',
        },
      ],
    },
  ];
  // @ts-ignore
  const menuTemplate = Menu.buildFromTemplate(menuList);
  Menu.setApplicationMenu(menuTemplate);
}
