const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const differrenceInMinutes = require("date-fns/differenceInMinutes");
const differenceInSeconds = require("date-fns/differenceInSeconds");
const Notification = electron.Notification;
const Store = require("electron-store");

const path = require("path");
const url = require("url");
const defaults = require("./utils/defaultSettings");
let currentUserSettings = new Store({ defaults });
console.log("TCL: currentUserSettings", currentUserSettings._defaultValues);

let mainWindow;
let postureFreq = 15000; //20 * 60000;
let movementFreq = 60000; //60 * 60000;
let lookFreq = 20000; //20 * 60000;
let hydrationFreq = 60 * 60000;
let mindfullFreq = 240 * 60000; // every 4 hrs???

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
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

function startTimer() {
  const now = new Date().getTime();
  let pstTime = now + postureFreq;
  let moveTime = now + movementFreq;
  let lookTime = now + lookFreq;
  let hydroTime = now + hydrationFreq;
  let mindTime = now + mindfullFreq;

  // let test9Sec = now + 60000;

  setInterval(() => {
    const now = new Date().getTime();

    // if (differenceInSeconds(now, test9Sec) > 9) {
    //   console.log(new Date().getSeconds());
    //   sendNotification('60 seconds', 'test mess');
    //   test9Sec += 60000;
    // }

    if (differenceInSeconds(now, pstTime) > 15) {
      // if (differrenceInMinutes(now, pstTime) > 20) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      sendNotification("Posture", "What sort of sitting is that?");
      console.log(`Notification for posture sent at ${time}`);
      pstTime +=
        postureFreq + currentUserSettings._defaultValues.posture.duration;
    }

    if (differenceInSeconds(now, moveTime) > 60) {
      // if (differrenceInMinutes(now, moveTime) > 60) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      sendNotification(
        "Time to move!!!",
        "Step away from your desk! No, seriously, just go!"
      );
      console.log(`Notification for movement sent at ${time}`);
      moveTime +=
        movementFreq + currentUserSettings._defaultValues.movement.duration;
    }

    if (differenceInSeconds(now, lookTime) > 20) {
      // if (differrenceInMinutes(now, lookTime) > 20) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      sendNotification(
        "Take care of your eyes!",
        "Look at an object at least 20 ft away for 20 seconds."
      );
      console.log(`Notification for 20/20/20 sent at ${time}`);
      lookTime +=
        lookFreq + currentUserSettings._defaultValues.eyeStrain.duration;
    }

    if (differrenceInMinutes(now, hydroTime) > 60) {
      sendNotification("Thirsty?", "Drink some H2O.");
      console.log(`Notification for ${activity} sent`);
      hydroTime += hydrationFreq;
    }

    if (differrenceInMinutes(now, mindTime) > 60) {
      sendNotification("Mind...", "...games");
      console.log(`Notification for min sent`);
      mindTime = mindfullFreq;
    }
  }, 1000);
}

function sendNotification(title, message) {
  const notif = new Notification({
    title: title,
    body: message
  });
  notif.show();
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

ipcMain.on("change-settings", (event, arg) => {
  console.log(arg);
  event.reply("settings-change-success", arg); // or event.reply('settings-change-failure)
  //update info on local storage
  //put request to database
});

ipcMain.on("set-delay", (event, arg) => {
  console.log(arg);
  event.reply("delay-success", arg); // or event.reply('delay-failure)
  //update info on local storage
  //put request to database
});

ipcMain.on("get-preferences", (event, arg) => {
  // make axios call to grab info for user
  // compare to the local store preferences (date modified?)
  // send back whichever is the more recent.
  event.reply("set-preferences", currentUserSettings.get());
});

ipcMain.on("main-app-init", (event, arg) => {
  // start the timer
  startTimer();
});

ipcMain.on("save-log", (event, arg) => {
  // set the user settings log with the array 'arg'
  currentUserSettings.set("log", arg);
  event.reply("log-saved", currentUserSettings.get());
});
