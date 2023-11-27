document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const { path } = event.target?.querySelector('input').files[0];

  window.$electron.submitVideo(path);
});

window.$electron.receiveVideoMetadata((data) => {
  document.querySelector('#result').innerHTML = `Video is ${data} seconds long.`;
});
