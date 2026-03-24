const { app, BrowserWindow } = require('electron');
const path = require('path');

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) { app.quit(); return; }

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280, height: 720, minWidth: 960, minHeight: 540,
    fullscreen: false, fullscreenable: true,
    title: 'Shape of Blacks',
    icon: path.join(__dirname, 'icon.png'),
    backgroundColor: '#0a0806',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false, contextIsolation: true,
      sandbox: false, webSecurity: true, allowRunningInsecureContent: false,
    },
  });

  mainWindow.setMenu(null);
  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F11') { mainWindow.setFullScreen(!mainWindow.isFullScreen()); event.preventDefault(); }
    if (input.key === 'F12') { mainWindow.webContents.toggleDevTools(); event.preventDefault(); }
  });

  mainWindow.maximize();
  mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { app.quit(); });
app.on('second-instance', () => { if (mainWindow) { if (mainWindow.isMinimized()) mainWindow.restore(); mainWindow.focus(); } });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
