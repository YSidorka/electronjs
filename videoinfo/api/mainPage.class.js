const { BrowserWindow } = require('electron');
const AppTray = require('./appTray.class');
const { join } = require('path');

class MainPage extends BrowserWindow {
  constructor() {
    super({
      width: 640,
      height: 480,

      resizable: false,
      frame: false,

      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: join(__dirname, '..', 'preload.js'),
        backgroundThrottling: true
      },
      show: false
    });

    new AppTray(join(__dirname, '..', 'ui', 'icon_24x24_2.png'), this);
    this.on('blur', () => this.hide());
  }
}

module.exports = MainPage;
