const { createAddWindow, clearTodoList } = require('./service');

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N',
        click: createAddWindow
      },
      {
        label: 'Clear list',
        click: clearTodoList
      },
      {
        type: 'separator'
      },
      { role: 'quit' }
    ]
  }
];

if (process.platform === 'darwin') {
  menuTemplate.unshift({
    label: ''
  });
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' }
      // {
      //   label: 'Toggle Developer Tools',
      //   accelerator: process.platform === 'darwin' ? 'Command+Alt+i' : 'Ctrl+Shift+i',
      //   click(item, focusedWindow) {
      //     focusedWindow.toggleDevTools();
      //   }
      // }
    ]
  });
}

module.exports = {
  menuTemplate
};
