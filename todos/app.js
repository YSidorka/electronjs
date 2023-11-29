const { app, ipcMain, Menu} = require('electron');
const { createWindow, getMainWindow, getAddWindow } = require('./service');
const { menuTemplate } = require("./menu-template");

app.on('ready', async () => {
  console.log('Ready...');
  const mainWindow = createWindow();
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

  await mainWindow.loadURL(`file://${__dirname}/ui/index.html`);
  mainWindow.on('closed', () => app.quit());
});

ipcMain.on('todo:add', async (event, data) => {
  getAddWindow().close();
  getMainWindow().webContents.send('ipcMain:todo:added', data);
});
