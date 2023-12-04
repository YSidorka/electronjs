const { Tray, Menu } = require('electron');

class AppTray extends Tray {
  constructor(iconPath, window) {
    super(iconPath);

    this.window = window;
    this.setToolTip('Timer App');
    this.on('click', onClick.bind(this));
    this.on('right-click', onRightClick.bind(this));
  }
}

function onClick(event, bounds, args) {
  const { height, width } = this.window.getBounds();
  const { x: trayX, y: trayY, height: trayHeight, width: trayWidth } = bounds;

  if (this.window.isVisible()) return this.window.hide();

  const x = trayX + Math.floor((trayWidth - width) / 2);
  let y = trayY;

  if (process.platform === 'darwin') y += trayHeight;
  if (process.platform === 'win32') y -= height;

  this.window.setBounds({ x, y, height, width });
  this.window.show();
}

function onRightClick() {
  const trayMenu = Menu.buildFromTemplate([{ role: 'quit' }]);
  this.popUpContextMenu(trayMenu);
}

module.exports = AppTray;
