// @flow

const http = require('http');
const fs = require('fs');
const path = require('path');
const { app, ipcMain, BrowserWindow, Menu, MenuItem } = require('electron');
const { download } = require('electron-dl');
const admin = require('firebase-admin');
const config = require('./config');

const serviceAccount = require(config.firebase.serviceAccountPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: config.firebase.storageBucket,
});

const DEBUG = process.env.NODE_ENV == 'development';
const storageBucket = admin.storage().bucket();

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

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const pdfDir = path.join(app.getPath('userData'), 'pdfs');
  if (!fs.existsSync(pdfDir)) fs.mkdir(pdfDir);

  ipcMain.on('maybe-download', (event, info) => {
    const pdfPath = path.join(app.getPath('userData'), info.pdfPath);
    if (!fs.exists(pdfPath)) {
      storageBucket.file(info.pdfPath).download({ destination: pdfPath }, () => {
        mainWindow.webContents.send('download-complete', pdfPath);
      });
    } else {
      mainWindow.webContents.send('download-complete', pdfPath);
    }
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
