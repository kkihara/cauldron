// @flow

import { remote } from 'electron';
import { deletePage } from './actions/page';
const { Menu, MenuItem } = remote;

const DEBUG = process.env.NODE_ENV == 'development';
const mainWindow = remote.getCurrentWindow();

type MenuInfo = {
  item: MenuItem,
  check: (MenuItem, MouseEvent) => bool,
}

export const createContextMenu = (store: any) => {
  const menu = new Menu();

  let deleteId;
  const menuInfos: Array<MenuInfo> = [
    // dev tools
    {
      item: new MenuItem({
        label: 'Dev Tools',
        click: () => mainWindow.webContents.openDevTools(),
      }),
      check: (menuItem, evt) => {
        return DEBUG;
      }
    },
    // delete page
    {
      item: new MenuItem({
        label: 'Delete Page',
        click: (menuItem, browserWindow, event) => {
          // FIXME: kinda hacky. deleteId will be set in check().
          if (deleteId !== null) {
            store.dispatch(deletePage(Number(deleteId)));
            deleteId = null;
          }
        },
      }),
      check: (menuItem, evt) => {
        const target = evt.target;
        if (target instanceof HTMLElement) {
          if (target.tagName == 'TR' && target.hasAttribute('id')) {
            deleteId = target.id;
            return true;
          }

          if (target.parentElement instanceof HTMLElement &&
              target.parentElement.tagName == 'TR' &&
              target.parentElement.hasAttribute('id')) {
            deleteId = target.parentElement.id;
            return true;
          } 
        }
        return false;
      }
    }
  ];

  menuInfos.map(menuInfo => {
    menu.append(menuInfo.item);
  });

  document.addEventListener('contextmenu', (evt: MouseEvent) => {
    menuInfos.map(menuInfo => {
      const menuItem = menuInfo.item;
      menuItem.visible = menuInfo.check(menuItem, evt);
    })
    menu.popup(mainWindow, evt.clientX, evt.clientY);
  });
};
