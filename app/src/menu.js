// @flow

import { remote } from 'electron';
const { Menu, MenuItem } = remote;

const DEBUG = process.env.NODE_ENV == 'development';
const mainWindow = remote.getCurrentWindow();

type MenuInfo = {
  item: MenuItem,
  check: (MenuItem, MouseEvent) => bool,
}

const menuInfos: Array<MenuInfo> = [
  {
    item: new MenuItem({
      label: 'Dev Tools',
      click: () => mainWindow.webContents.openDevTools()
    }),
    check: (menuItem, evt) => {
      return DEBUG;
    }
  },
  {
    item: new MenuItem({
      label: 'Delete Page',
      click: (evt: MouseEvent) => {
        console.log('delete page');
      }
    }),
    check: (menuItem, evt) => {
      return (
        evt.target.classList.contains('pageSelector') ||
        evt.target.parentElement.classList.contains('pageSelector'));
    }
  }
];

export const createContextMenu = (store: any) => {
  const menu = new Menu();
  mainWindow.webContents.openDevTools();

  menuInfos.map(menuInfo => {
    menu.append(menuInfo.item);
  });

  document.addEventListener('contextmenu', (evt: MouseEvent) => {
    console.log(evt);
    menuInfos.map(menuInfo => {
      const menuItem = menuInfo.item;
      menuItem.visible = menuInfo.check(menuItem, evt);
    })
    menu.popup(mainWindow, evt.clientX, evt.clientY);
  });
};
