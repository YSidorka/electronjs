const menuTemplate = [
  {
    label: 'File',
    submenu: [{ role: 'quit' }]
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
    submenu: [{ role: 'reload' }, { role: 'forceReload' }, { role: 'toggleDevTools' }]
  });
}

module.exports = {
  menuTemplate
};