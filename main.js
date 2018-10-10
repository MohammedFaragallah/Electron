const _ = require('lodash');
const { app, BrowserWindow, ipcMain, shell } = require('electron');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer');
const ffmpeg = require('fluent-ffmpeg');
require('electron-reload')(__dirname, {
  // eslint-disable-next-line
  electron: require('${__dirname}/../../node_modules/electron'),
});

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { backgroundThrottling: false },
  });
  mainWindow.loadURL('http://localhost:3000');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
};

app.on('ready', () => {
  createWindow();

  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err));
  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err));
});

ipcMain.on('videos:added', (e, videos) => {
  let promises = videos.map(video => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metadata) => {
        resolve({
          ...video,
          duration: metadata.format.duration,
          format: 'avi',
        });
      });
    });
  });
  Promise.all(promises).then(res => {
    mainWindow.webContents.send('metadata:complete', res);
  });
});

ipcMain.on('conversion:start', (event, videos) => {
  _.each(videos, video => {
    mainWindow.webContents.send('conversion:end', video.path);
  });
  // _.each(videos, video => {
  //   const outputDirectory = video.path.split(video.name)[0];
  //   const outputName = video.name.split('.')[0];
  //   const outputPath = `${outputDirectory}${outputName}.${video.format}`;

  //   ffmpeg(video.path)
  //     .output(outputPath)
  //     .on('progress', ({ timemark }) =>
  //       mainWindow.webContents.send('conversion:progress', { video, timemark })
  //     )
  //     .on('end', () =>
  //       mainWindow.webContents.send('conversion:end', { video, outputPath })
  //     )
  //     .run();
  // });
});

ipcMain.on('folder:open', (event, outputPath) => {
  shell.showItemInFolder(outputPath);
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});
