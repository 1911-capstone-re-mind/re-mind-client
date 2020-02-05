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

// init html file views
let mainWindow;
let mindWindow;
let moveWindow;
let visionWindow;

// init scheduler variables
let pstTime;
let moveTime;
let visionTime;
let hydroTime;
let mindTime;

// init date variables
const month = new Date().getMonth() + 1;
const date = new Date().getDate();

// get settings from local storage for schedulers
const getSetting = settingName => {
  let preferences = {};
  currentUserSettings.get("userPreferences").forEach(pref => {
    if (pref.activity.name === settingName) {
      preferences["name"] = pref.activity.name;
      preferences["userPreferenceId"] = pref.id;
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
  // 30 seconds heads up triggers for modals
  let moveHeadsUp = false;
  let visionHeadsUp = false;
  let mindHeadsUp = false;

  //frequency and duration preferences for user
  const posturePref = getSetting("posture");
  const movePref = getSetting("movement");
  const visionPref = getSetting("vision");
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
    movePref.active
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
    hydrationPref.active
  );
  mindTime = new Scheduler(
    now + mindfulPref.frequency,
    mindfulPref.frequency,
    mindfulPref.duration,
    mindfulPref.active
  );

  setInterval(() => {
    const now = new Date().getTime();
<<<<<<< HEAD
=======

    let time;
    console.log("TCL: now", new Date().getSeconds());
>>>>>>> master

    //notifications that don't require pop up windows
    if (now >= pstTime.trigger && pstTime.active) {
      sendNotification("Posture", "How's your posture? Make sure you're sitting correctly");
      pstTime.setNextNotif();
    }

    if (now >= hydroTime.trigger && hydroTime.active) {
      sendNotification("Hydration", "Have you been drinking water? Stay hydrated");
      hydroTime.setNextNotif();
    }

    // notifications that require pop up windows
    if (now >= moveTime.trigger && moveTime.active && !moveTime.inProgress) {
      openMoveModal();
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
        "It's almost time to stretch your legs"
      );
      moveHeadsUp = true;
    }

<<<<<<< HEAD
    if (now >= visionTime.trigger && visionTime.active && !visionTime.inProgress) {
      openVisionModal();
      visionTime.inProgress = true
=======
    if (
      now >= visionTime.trigger &&
      visionTime.active &&
      !visionTime.inProgress
    ) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      openVisionModal("vision");
      console.log(`Notification for 20/20/20 sent at ${time}`);
      visionTime.inProgress = true;
>>>>>>> master
      visionHeadsUp = false;
    } else if (
      now >= visionTime.trigger - 30000 &&
      visionTime.active &&
      !visionTime.inProgress &&
      !visionHeadsUp
    ) {
      sendNotification(
        "Vision Break",
        "It's almost time to look away from your screen"
      );
      visionHeadsUp = true;
    }

<<<<<<< HEAD
    if (now >= mindTime.trigger && mindTime.active && !mindHeadsUp && !mindTime.inProgress) {
      openMindModal();
=======
    if (
      now >= mindTime.trigger &&
      mindTime.active &&
      !mindHeadsUp &&
      !mindTime.inProgress
    ) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      openMindModal("mindfulness");
      console.log(`Notification for mindfulness sent at ${time}`);
>>>>>>> master
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
        "It's almost time to calm your mind"
      );
      mindHeadsUp = true;
    }
  }, 1000);
}

function startSyncTimer() {
  const log = currentUserSettings.get("log");
  let req = [];
  for (let activity in log) {
    req.push(log[activity]);
  }

  setInterval(async () => {
    await axios.put("http://localhost:8080/api/activity-log/log/", req);
  }, 60000 * 15);
}

function sendNotification(title, message) {
  const notif = new Notification({
    title: title,
    body: message
  });
  notif.show();
}

function openMindModal() {
  mindWindow = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    webPreferences: { nodeIntegration: true }
  });
  mindWindow.on("closed", () => {
    mindWindow = null;
  });

  var theUrl = path.join(__dirname, '/modals/mindfulness.html');

  mindWindow.loadFile(theUrl);
}

function openMoveModal() {
  moveWindow = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    webPreferences: { nodeIntegration: true }
  });
  moveWindow.on("closed", () => {
    moveWindow = null;
  });

  var theUrl = path.join(__dirname, '/modals/movement.html');

  moveWindow.loadFile(theUrl);
}

function openVisionModal() {
  visionWindow = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    webPreferences: { nodeIntegration: true }
  });
  visionWindow.on("closed", () => {
    visionWindow = null;
  });

  var theUrl = path.join(__dirname, '/modals/vision.html');

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
  let currentSessions = currentUserSettings.get(
    "log.mindfulness.completed_sessions"
  );
  currentUserSettings.set(
    "log.mindfulness.completed_sessions",
    currentSessions + 1
  );
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
  let currentSessions = currentUserSettings.get(
    "log.movement.completed_sessions"
  );
  currentUserSettings.set(
    "log.movement.completed_sessions",
    currentSessions + 1
  );
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
  let currentSessions = currentUserSettings.get(
    "log.vision.completed_sessions"
  );
  currentUserSettings.set("log.vision.completed_sessions", currentSessions + 1);
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
  event.reply("settings-change-success", arg); // or event.reply('settings-change-failure)
  //update info on local storage
  //put request to database
});

ipcMain.on("set-delay", (event, arg) => {
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

  const posturePref = getSetting("posture");
  const movePref = getSetting("movement");
  const visionPref = getSetting("vision");
  const hydrationPref = getSetting("hydration");
  const mindfulPref = getSetting("mindfulness");

  const activities = [
    posturePref,
    movePref,
    visionPref,
    hydrationPref,
    mindfulPref
  ];
  // clear previous log
  currentUserSettings.delete("log");
  // initialize the log with null values
  activities.forEach(activity => {
    currentUserSettings.set(`log.${activity.name}`, {
      userPreferenceId: activity.userPreferenceId,
      month: month,
      date: date,
      completed_sessions: 0
    });
  });
});

// called on main app mount
ipcMain.on("save-log", (event, arg) => {
  // set the user's activity log  in loca storage with the server activity log
  currentUserSettings.set("activityBackLog", arg);
  event.reply("log-saved", currentUserSettings.get());
});

ipcMain.on("save-preferences", (event, arg) => {
  currentUserSettings.set("userPreferences", arg);
  const posturePref = getSetting("posture");
  const movePref = getSetting("movement");
  const visionPref = getSetting("vision");
  const hydrationPref = getSetting("hydration");
  const mindfulPref = getSetting("mindfulness");

  pstTime.frequency = posturePref.frequency;
  pstTime.duration = posturePref.duration;
  pstTime.active = posturePref.active;

  moveTime.frequency = movePref.frequency;
  moveTime.duration = movePref.duration;
  moveTime.active = movePref.active;

  visionTime.frequency = visionPref.frequency;
  visionTime.duration = visionPref.duration;
  visionTime.active = visionPref.active;

  hydroTime.frequency = hydrationPref.frequency;
  hydroTime.duration = hydrationPref.duration;
  hydroTime.active = hydrationPref.active;

  mindTime.frequency = mindfulPref.frequency;
  mindTime.duration = mindfulPref.duration;
  mindTime.active = mindfulPref.active;

  event.reply("preferences-saved", currentUserSettings.get());
});
