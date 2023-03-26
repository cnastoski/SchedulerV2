const electron = require("electron");
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

//code for the context menu
const MenuItem = electron.MenuItem

//enable remote module
const remoteMain = require('@electron/remote/main');
remoteMain.initialize();

//remove the security warning on startup
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, /* set to true so modules like fs can be imported into scripts
                                 minor security issue, only when using untrusted third party scripts */
      contextIsolation: false,
      enableRemoteModule: true
    },
  });

  remoteMain.enable(mainWindow.webContents);

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
  createWindow();

  const template=[
    {
      label: 'demo'
    }
  ]
  //const menu = Menu.buildFromTemplate(template)
  //Menu.setApplicationMenu(menu)
  //const ctxMenu = new Menu();

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
