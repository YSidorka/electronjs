document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const { path } = event.target?.querySelector('input').files[0];
  window.$api.send('video:submit', path);
});

window.$api.on('ipcMain:video-data', (data) => {
  let html = `Video is ${data.duration || 0} seconds long.
  <ul>`;
  Object.keys(data).forEach((key) => {
    if (!key.startsWith('nb') && !key.startsWith('tag')) html += `<li>${key}: ${data[key]}</li>`;
  });
  html += '</ul>';
  document.querySelector('#result').innerHTML = html;
});
