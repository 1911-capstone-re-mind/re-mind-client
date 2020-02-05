const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const ipcMain = electron.ipcMain;
const Notification = electron.Notification;
const Store = require("electron-store");
const Scheduler = require("./utils/scheduler");
const axios = require("axios");

const path = require("path");
const url = require("url");
const defaults = require("./utils/defaultSettings");
let currentUserSettings = new Store({ defaults });
console.log("TCL: currentUserSettings", currentUserSettings._defaultValues);

// init html file views
let mainWindow;
let mindWindow;
let moveWindow;
let visionWindow;

// init scheduler variables
let pstTime
let moveTime
let visionTime
let hydroTime
let mindTime

// get settings from local storage for schedulers
const getSetting = settingName => {
  let preferences = {};
  currentUserSettings.get("userPreferences").forEach(pref => {
    if (pref.activity.name === settingName) {
      preferences["frequency"] = pref.frequency;
      preferences["duration"] = pref.duration;
      preferences["active"] = pref.active;
    }
  });
  return preferences;
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.webContents.openDevTools();
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
  // settings heads up for modal windows
  let moveHeadsUp = false;
  let moveInProgress = false;
  let visionHeadsUp = false;
  let visionInProgress = false;
  let mindHeadsUp = false;
  let mindInProgress = false;

  //frequency and duration preferences for user
  const posturePref = getSetting("posture");
  const movePref = getSetting("movement");
  const visionPref = getSetting("eye strain");
  const hydrationPref = getSetting("hydration");
  const mindfulPref = getSetting("mindfulness");

  //scheduler objects that track when to trigger a notificaiton
  const now = new Date().getTime();
  pstTime = new Scheduler(
    now + posturePref.frequency,
    posturePref.frequency,
    posturePref.duration,
    posturePref.active
  );
  moveTime = new Scheduler(
    now + movePref.frequency,
    movePref.frequency,
    movePref.duration,
    movePref.active,
  );
  visionTime = new Scheduler(
    now + visionPref.frequency,
    visionPref.frequency,
    visionPref.duration,
    visionPref.active
  );
  hydroTime = new Scheduler(
    now + hydrationPref.frequency,
    hydrationPref.frequency,
    hydrationPref.duration,
    hydrationPref.active,
  );
  mindTime = new Scheduler(
    now + mindfulPref.frequency,
    mindfulPref.frequency,
    mindfulPref.duration,
    mindfulPref.active
  );

  setInterval(() => {
    const now = new Date().getTime();
    let time;
    console.log("TCL: now", new Date().getSeconds());

    // if (differenceInSeconds(now, test9Sec) > 9) {
    //   console.log(new Date().getSeconds());
    //   sendNotification('60 seconds', 'test mess');
    //   test9Sec += 60000;
    // }
    console.log("TCL: pstTime", pstTime);

    // notifications only
    if (now >= pstTime.trigger && pstTime.active) {
      // if (differrenceInMinutes(now, pstTime) > 20) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      console.log("TCL: time", time);
      sendNotification("Posture", "What sort of sitting is that?");
      console.log(`Notification for posture sent at ${time}`);
      pstTime.setNextNotif();
    }

    if (now >= hydroTime.trigger && hydroTime.active) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      sendNotification("Thirsty?", "Drink some H2O.");
      console.log(`Notification for hydration sent at ${time}`);
      hydroTime.setNextNotif();
    }

    // modal screen
    if (now >= moveTime.trigger && moveTime.active && !moveTime.inProgress) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      openMoveModal("movement");
      console.log(`Notification for movement sent at ${time}`);
      moveTime.inProgress = true;
      moveHeadsUp = false;
    } else if (
      now >= moveTime.trigger - 30000 &&
      moveTime.active &&
      !moveTime.inProgress &&
      !moveHeadsUp
    ) {
      sendNotification(
        "Movement Break",
        "Your movement break is coming up in 30 seconds"
      );
      moveHeadsUp = true;
    }

    if (now >= visionTime.trigger && visionTime.active && !visionTime.inProgress) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      openVisionModal("vision");
      console.log(`Notification for 20/20/20 sent at ${time}`);
      visionTime.inProgress = true
      visionHeadsUp = false;
    } else if (
      now >= visionTime.trigger - 30000 &&
      visionTime.active &&
      !visionTime.inProgress &&
      !visionHeadsUp
    ) {
      sendNotification(
        "Vision Break",
        "Your vision break is coming up in 30 seconds"
      );
      visionHeadsUp = true;
    }

    if (now >= mindTime.trigger && mindTime.active && !mindHeadsUp && !mindTime.inProgress) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      openMindModal("mindfulness");
      console.log(`Notification for mindfulness sent at ${time}`);
      mindTime.inProgress = true;
      mindHeadsUp = false;
    } else if (
      now >= mindTime.trigger - 30000 &&
      mindTime.active &&
      !mindTime.inProgress &&
      !mindHeadsUp
    ) {
      sendNotification(
        "Mindfulness Break",
        "Your mind break is coming up in 30 seconds"
      );
      mindHeadsUp = true;
    }
  }, 1000);
}

function startSyncTimer() {
  setInterval(async () => {
    await axios.put(
      "http://localhost:8080/api/log/"
      //local storage data, array of items
    );
  }, 60000 * 15);
}

function sendNotification(title, message) {
  const notif = new Notification({
    title: title,
    body: message
  });
  notif.show();
}

function openMindModal(activity) {
  mindWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true }
  });
  mindWindow.webContents.openDevTools();
  mindWindow.on("closed", () => {
    mindWindow = null;
  });

  var theUrl = path.join(__dirname, `/modals/${activity}.html`);
  console.log("url", theUrl);

  mindWindow.loadFile(theUrl);
}

function openMoveModal(activity) {
  moveWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true }
  });
  moveWindow.webContents.openDevTools();
  moveWindow.on("closed", () => {
    moveWindow = null;
  });

  var theUrl = path.join(__dirname, `/modals/${activity}.html`);
  console.log("url", theUrl);

  moveWindow.loadFile(theUrl);
}

function openVisionModal(activity) {
  visionWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true }
  });
  visionWindow.webContents.openDevTools();
  visionWindow.on("closed", () => {
    visionWindow = null;
  });

  var theUrl = path.join(__dirname, `/modals/${activity}.html`);
  console.log("url", theUrl);

  visionWindow.loadFile(theUrl);
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
// MINDFULNESS EVENTS
ipcMain.on("mindfulness-accepted", event => {
  event.reply("mindfulness-start-counter", mindTime.duration);
});

ipcMain.on("mindfulness-finished", () => {
  mindWindow.close();
  mindTime.restart();
});

ipcMain.on("mindfulness-rejected", () => {
  mindWindow.close();
  mindTime.restart();
});

ipcMain.on("mindfulness-delayed", () => {
  mindWindow.close();
  mindTime.setDelay(15000);
});
// END MINDFULNESS EVENTS
//movement IPC
ipcMain.on("movement-accepted", event => {
  event.reply("movement-start-counter", moveTime.duration);
});

ipcMain.on("movement-finished", () => {
  moveWindow.close();
  moveTime.restart();
});

ipcMain.on("movement-rejected", () => {
  moveWindow.close();
  moveTime.restart();
});

ipcMain.on("movement-delayed", () => {
  moveWindow.close();
  moveTime.setDelay(60000 * 5);
});
//end movement IPC

//vision IPC
ipcMain.on("vision-accepted", event => {
  event.reply("vision-start-counter", visionTime.duration);
});

ipcMain.on("vision-finished", () => {
  visionWindow.close();
  visionTime.restart();
});

ipcMain.on("vision-rejected", () => {
  visionWindow.close();
  visionTime.restart();
});

ipcMain.on("vision-delayed", () => {
  visionWindow.close();
  visionTime.setDelay(60000 * 5);
});
//end vision IPC

//change settings IPC
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
  startSyncTimer();
});

ipcMain.on("save-log", (event, arg) => {
  // set the user settings log with the array 'arg'
  currentUserSettings.set("log", arg);
  event.reply("log-saved", currentUserSettings.get());
});

ipcMain.on("save-preferences", (event, arg) => {
  currentUserSettings.set("userPreferences", arg);
  const posturePref = getSetting("posture");
  const movePref = getSetting("movement");
  const visionPref = getSetting("eye strain");
  const hydrationPref = getSetting("hydration");
  const mindfulPref = getSetting("mindfulness");

  pstTime.frequency = posturePref.frequency
  pstTime.duration = posturePref.duration
  pstTime.active = posturePref.active

  moveTime.frequency = movePref.frequency
  moveTime.duration = movePref.duration
  moveTime.active = movePref.active

  visionTime.frequency = visionPref.frequency
  visionTime.duration = visionPref.duration
  visionTime.active = visionPref.active

  hydroTime.frequency = hydrationPref.frequency
  hydroTime.duration = hydrationPref.duration
  hydroTime.active = hydrationPref.active

  mindTime.frequency = mindfulPref.frequency
  mindTime.duration = mindfulPref.duration
  mindTime.active = mindfulPref.active

  event.reply("preferences-saved", currentUserSettings._defaultValues);
});
