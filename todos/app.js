const { app, ipcMain, Menu } = require('electron');
const { menuTemplate } = require('./menu-template');
const { createWindow } = require('./service');

let mainWindow;

app.on('ready', async () => {
  console.log('Ready...');
  mainWindow = createWindow();
  await mainWindow.loadURL(`file://${__dirname}/ui/index.html`);
  mainWindow.on('closed', () => app.quit());


  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

ipcMain.on('ipc:create-task', async (event, data) => {
  console.log('ipc:create-task', data);
});
