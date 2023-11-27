const { app, BrowserWindow, ipcMain } = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const { promisify } = require('util');
const ffprobe = promisify(ffmpeg.ffprobe);

let mainWindow;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  // win.loadFile('ui/index.html');
  win.loadURL(`file://${__dirname}/ui/index.html`);
  return win;
}

app.on('ready', async () => {
  console.log('Ready');
  mainWindow = createWindow();
});

ipcMain.on('video:submit', async (event, filePath) => {
  const metadata = await ffprobe(filePath).catch(() => null);
  if (!metadata) return;
  event.sender.send('ipcMain:video-data', metadata.format?.duration);
});
