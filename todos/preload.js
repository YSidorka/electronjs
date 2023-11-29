const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('$electron', {
  createTask: (data) => {
    ipcRenderer.send('todo:add', data);
  },

  receiveTaskData: (callback) => {
    ipcRenderer.on('ipcMain:todo:added', (event, data) => {
      callback(data);
    });
  }
});
