const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('$api', {

  send: (channel, data) => {
    ipcRenderer.send(channel, data)
  },

  on: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => callback(...args))
  }

});
