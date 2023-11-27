const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('$electron', {
  createTask: (data) => {
    ipcRenderer.send('ipc:create-task', data);
    console.log(data);
  }
});
