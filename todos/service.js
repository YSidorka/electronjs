const { BrowserWindow } = require('electron');
const { join } = require('path');

let addWindow;

function createWindow() {
  const window = new BrowserWindow({
    width: 640,
    height: 480,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.js')
    }
  });
  return window;
}

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 320,
    height: 240,
    title: 'Add New Task',
    resizable: false
  });
  addWindow.loadURL(`file://${__dirname}/ui/add.html`)
}

module.exports = {
  createWindow,
  createAddWindow
};
