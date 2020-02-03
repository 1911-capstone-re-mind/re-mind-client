const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain  = electron.ipcMain

const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, "/../public/index.html"),
        protocol: "file:",
        slashes: true
      })
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('change-settings', (event, arg) => {
  console.log(arg)
  event.reply('settings-change-success', arg) // or event.reply('settings-change-failure)
  //update info on local storage
  //put request to database
})

ipcMain.on('set-delay', (event, arg) => {
  console.log(arg)
  event.reply('delay-success', arg) // or event.reply('delay-failure)
  //update info on local storage
  //put request to database
})

