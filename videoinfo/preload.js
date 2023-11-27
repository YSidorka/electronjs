const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('$electron', {
  submitVideo: (filePath) => {
    ipcRenderer.send('video:submit', filePath);
  },

  receiveVideoMetadata: (onMetadataReceived) => {
    ipcRenderer.on('ipcMain:video-data', (event, duration) => {
      onMetadataReceived(duration);
    });
  }
});
