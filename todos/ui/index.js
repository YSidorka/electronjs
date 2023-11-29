const listEl = document.querySelector('ul.list-group');

window.$api.on('ipcMain:todo:clearList', () => {
  if (listEl) listEl.innerHTML = '';
});

window.$api.on('ipcMain:todo:added', (data) => {
  if (!listEl) return;

  const newItem = document.createElement('li');
  newItem.classList.add('list-group-item');
  newItem.innerHTML = data;
  listEl.appendChild(newItem);
});
