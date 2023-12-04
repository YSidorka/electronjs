function getInfo() {
  const files = getFiles();
  Array.from(files).forEach((item) => window.$api.send('video:getInfo', item.path));
}

function convertFiles() {
  const files = getFiles();
  Array.from(files).forEach((item) => window.$api.send('video:convertFiles', item.path));
}

function getFiles() {
  try {
    const form = document.querySelector('form');
    const { files } = form.querySelector('input');
    return files || [];
  } catch (err) {
    return []
  }
}

window.$api.on('ipcMain:videoData', (data) => {
  let html = document.querySelector('#result').innerHTML;
  html += `<hr>Video is ${data.duration || 0} seconds long.<ul>`;
  Object.keys(data).forEach((key) => {
    if (!key.startsWith('nb') && !key.startsWith('tag')) html += `<li>${key}: ${data[key]}</li>`;
  });
  html += '</ul>';
  document.querySelector('#result').innerHTML = html;
});

window.$api.on('ipcMain:videoConverted', (data) => {
  let html = document.querySelector('#result').innerHTML;
  html = html.replace('<hr>', `<hr><p>Video converted: <em>${data}</em></p><hr>`);
  document.querySelector('#result').innerHTML = html;
});
