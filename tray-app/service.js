const { BrowserWindow } = require('electron');
const { join } = require('path');

let mainWindow;

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

module.exports = {
  getMainWindow: () => mainWindow,
  createWindow
};
