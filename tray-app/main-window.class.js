const { BrowserWindow } = require('electron');
const TimerTray = require('./timer-tray.class');
const { join } = require('path');

class MainWindow extends BrowserWindow {
  constructor() {
    super({
      width: 320,
      // height: 432,
      resizable: false,
      frame: false,
      height: 404,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(__dirname, 'preload.js'),
        backgroundThrottling: false
      },
      show: false
    });

    new TimerTray(join(__dirname, 'icons', 'icon_24x24_1.png'), this);
    this.on('blur', () => this.hide());
  }
}

module.exports = MainWindow;
