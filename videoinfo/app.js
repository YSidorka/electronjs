const { app, ipcMain } = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const { join, basename, extname, dirname } = require('path');

const { promisify } = require('util');
const MainPage = require('./api/mainPage.class');
const ffprobe = promisify(ffmpeg.ffprobe);

let mainWindow;

app.on('ready', async () => {
  app.dock.hide();
  mainWindow = new MainPage();
  await mainWindow.loadURL(`file://${__dirname}/ui/index.html`);
});

ipcMain.on('video:getInfo', async (event, path) => {
  const metadata = await ffprobe(path).catch(() => null);
  if (!metadata) return;
  event.sender.send('ipcMain:videoData', metadata.format);
});

ipcMain.on('video:convertFiles', async (event, path) => {
  const output = join(dirname(path), basename(path, extname(path)));
  ffmpeg(path)
    .output(`${output}.avi`)
    .on('end', () => {
      event.sender.send('ipcMain:videoConverted', output)
    })
    .run();
});
