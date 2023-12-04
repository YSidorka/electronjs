const { app, ipcMain } = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { promisify } = require('util');
const MainPage = require('./api/mainPage.class');
const ffprobe = promisify(ffmpeg.ffprobe);

let mainWindow;

app.on('ready', async () => {
  app.dock.hide();
  mainWindow = new MainPage();
  await mainWindow.loadURL(`file://${__dirname}/ui/index.html`);
});

ipcMain.on('video:submit', async (event, filePath) => {
  const metadata = await ffprobe(filePath).catch(() => null);
  if (!metadata) return;
  event.sender.send('ipcMain:video-data', metadata.format);
});
