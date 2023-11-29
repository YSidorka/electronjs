const { app, ipcMain, Menu } = require('electron');
const { createWindow, getMainWindow } = require('./service');
const { menuTemplate } = require('./menu-template');

app.on('ready', async () => {
  const mainWindow = createWindow();
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

  await mainWindow.loadURL(`file://${__dirname}/ui/index.html`);
  mainWindow.on('closed', () => app.quit());
});

ipcMain.on('tray:test', async (event, data) => {
  getMainWindow().webContents.send('ipcMain:test', data);
});
