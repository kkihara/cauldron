// @flow

const electron = require('electron');
const { app, BrowserWindow, Menu, MenuItem } = electron;

const DEBUG = process.env.NODE_ENV == 'development';

// Let electron reloads by itself when webpack watches changes in ./app/
if (DEBUG) {
  require('electron-reload')(__dirname);
}

// To avoid being garbage collected
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    devTools: DEBUG
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  // Menu
  const menu = new electron.Menu();
  if (DEBUG) {
    mainWindow.webContents.openDevTools();
    const menuItem = new electron.MenuItem({
      label: 'Dev Tools',
      click: () => mainWindow.webContents.openDevTools()
    });
    menu.append(menuItem);
  }

    mainWindow.webContents.on('context-menu', (e, params) => {
      menu.popup(mainWindow, params.x, params.y);
    })

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// App ready
app.on('ready', createWindow);

// App window closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

// App open
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
