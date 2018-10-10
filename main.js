const path = require('path');
const { app, ipcMain } = require('electron');

const TimerTray = require('./electron/timerTray');
const MainWindow = require('./electron/mainWindow');
require('electron-reload')(__dirname, {
  electron: require('${__dirname}/../../node_modules/electron'),
});

let mainWindow;
let tray;

app.on('ready', () => {
  if (process.platform === 'darwin') {
    app.dock.hide();
  }
  mainWindow = new MainWindow(`http://localhost:3000`);

  const iconName =
    process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on('update-timer', (event, timeLeft) => {
  tray.setTitle(timeLeft);
});
