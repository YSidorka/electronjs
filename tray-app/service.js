const { BrowserWindow, Tray } = require('electron');
const { join } = require('path');

let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320,
    // height: 432,
    resizable: false,
    frame: false,
    height: 404,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.js')
    },
    show: false
  });

  createTray();

  return mainWindow;
}

function createTray() {
  tray = new Tray(join(__dirname, 'icons', 'icon_24x24_1.png'));
  tray.on('click', toggleWindow.bind(this, mainWindow));
}

function toggleWindow(window, event, bounds, args) {
  const { height, width } = window.getBounds();
  const { x: trayX, y: trayY, height: trayHeight, width: trayWidth } = bounds;

  if (window.isVisible()) return window.hide();

  let y = trayY;

  if (process.platform === 'darwin') {

    window.setBounds({
      x: trayX + Math.floor((trayWidth - width)/ 2),
      y: trayY + trayHeight,
      height,
      width
    });
  }
  if (process.platform === 'win32') {
    window.setBounds({
      x: trayX + Math.floor((trayWidth - width)/ 2),
      y: trayY - height,
      height,
      width
    });
  }
  window.show();
}

module.exports = {
  getMainWindow: () => mainWindow,
  createWindow
};
