const { BrowserWindow } = require('electron');
const { join } = require('path');

let mainWindow;
let addWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 640,
    height: 480,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.js')
    }
  });
  return mainWindow;
}

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 320,
    height: 240,
    title: 'Add New Task',
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.js')
    }
  });
  addWindow.loadURL(`file://${__dirname}/ui/add.html`);
  addWindow.on('closed', () => addWindow = null);
}

module.exports = {
  getMainWindow: () => mainWindow,
  getAddWindow: () => addWindow,
  createWindow,
  createAddWindow
};
