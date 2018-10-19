// @flow

// Basic init
const electron = require('electron');
const path = require('path');
const url = require('url');
const { app, BrowserWindow } = electron;

// Let electron reloads by itself when webpack watches changes in ./app/
require('electron-reload')(__dirname);

// To avoid being garbage collected
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  // open dev tools
  mainWindow.webContents.openDevTools();

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
