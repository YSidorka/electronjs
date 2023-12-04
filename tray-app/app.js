const { app } = require('electron');
const MainWindow = require('./main-window.class');

let mainWindow;

app.on('ready', async () => {
  app.dock.hide();
  mainWindow = new MainWindow();
  await mainWindow.loadURL(`file://${__dirname}/ui/index.html`);
});
