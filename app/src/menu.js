// @flow

import { remote } from 'electron';

const DEBUG = process.env.NODE_ENV == 'development';

export const createContextMenu = (store: any) => {
  const menu = new remote.Menu();
  const mainWindow = remote.getCurrentWindow();

  if (DEBUG) {
    mainWindow.webContents.openDevTools();
    const menuItem = new remote.MenuItem({
      label: 'Dev Tools',
      click: () => mainWindow.webContents.openDevTools()
    });
    menu.append(menuItem);
  }

  mainWindow.webContents.on('context-menu', (e, params) => {
    menu.popup(mainWindow, params.x, params.y);
  });
};
