const electron = require('electron');
const { app, session } = require('electron');
const BrowserWindow = electron.BrowserWindow;

const ipcMain = electron.ipcMain;
const Notification = electron.Notification;
const Store = require('electron-store');
const Scheduler = require('./utils/scheduler');
const axios = require('axios');

const path = require('path');
const url = require('url');
const defaults = require('./utils/defaultSettings');
let currentUserSettings = new Store({ defaults });

//init timers
let masterTimer;
let syncTimer;

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
  currentUserSettings.get('userPreferences').forEach(pref => {
    if (pref.activity.name === settingName) {
      preferences['name'] = pref.activity.name;
      preferences['userPreferenceId'] = pref.id;
      preferences['frequency'] = pref.frequency;
      preferences['duration'] = pref.duration;
      preferences['active'] = pref.active;
    }
  });
  return preferences;
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    x: 300,
    y: 200,
    webPreferences: {
      nodeIntegration: true,
    },
    resizable: true,
  });
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true,
      })
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (moveWindow) {
      moveWindow.close();
    }
    if (visionWindow) {
      visionWindow.close();
    }
    if (mindWindow) {
      mindWindow.close();
    }
    clearInterval(masterTimer);
    clearInterval(syncTimer);
  });
}

function startTimer() {
  // 30 seconds heads up triggers for modals
  let moveHeadsUp = false;
  let visionHeadsUp = false;
  let mindHeadsUp = false;

  //frequency and duration preferences for user
  const posturePref = getSetting('posture');
  const movePref = getSetting('movement');
  const visionPref = getSetting('vision');
  const hydrationPref = getSetting('hydration');
  const mindfulPref = getSetting('mindfulness');

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

  masterTimer = setInterval(() => {
    const now = new Date().getTime();

    //notifications that don't require pop up windows
    if (now >= pstTime.trigger && pstTime.active) {
      sendNotification(
        'Posture',
        "How's your posture? Make sure you're sitting correctly"
      );
      pstTime.setNextNotif();
    }

    if (now >= hydroTime.trigger && hydroTime.active) {
      sendNotification(
        'Hydration',
        'Have you been drinking water? Stay hydrated'
      );
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
        'Movement Break',
        "It's almost time to stretch your legs"
      );
      moveHeadsUp = true;
    }

    if (
      now >= visionTime.trigger &&
      visionTime.active &&
      !visionTime.inProgress
    ) {
      openVisionModal();
      visionTime.inProgress = true;

      visionHeadsUp = false;
    } else if (
      now >= visionTime.trigger - 30000 &&
      visionTime.active &&
      !visionTime.inProgress &&
      !visionHeadsUp
    ) {
      sendNotification(
        'Vision Break',
        "It's almost time to look away from your screen"
      );
      visionHeadsUp = true;
    }

    if (now >= mindTime.trigger && mindTime.active && !mindTime.inProgress) {
      openMindModal();

      mindTime.inProgress = true;
      mindHeadsUp = false;
    } else if (
      now >= mindTime.trigger - 30000 &&
      mindTime.active &&
      !mindTime.inProgress &&
      !mindHeadsUp
    ) {
      sendNotification(
        'Mindfulness Break',
        "It's almost time to calm your mind"
      );
      mindHeadsUp = true;
    }
  }, 1000);
}

function startSyncTimer() {
  syncTimer = setInterval(async () => {
    const log = currentUserSettings.get('log');
    let req = [];
    for (let activity in log) {
      req.push(log[activity]);
    }
    await axios.put('http://localhost:8080/api/activity-log/log/', req);
  }, 60000 * 15);
}

function sendNotification(title, message) {
  const notif = new Notification({
    title: title,
    body: message,
  });
  notif.show();
}

function openMindModal() {
  mindWindow = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: { nodeIntegration: true },
  });
  mindWindow.on('closed', () => {
    mindTime.restart();
    mindWindow = null;
  });

  var theUrl = path.join(__dirname, '/modals/mindfulness.html');

  mindWindow.loadFile(theUrl);
}

function openMoveModal() {
  moveWindow = new BrowserWindow({
    width: 400,
    height: 250,
    webPreferences: { nodeIntegration: true },
  });
  moveWindow.on('closed', () => {
    moveTime.restart();
    moveWindow = null;
  });

  var theUrl = path.join(__dirname, '/modals/movement.html');

  moveWindow.loadFile(theUrl);
}

function openVisionModal() {
  visionWindow = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: { nodeIntegration: true },
  });
  visionWindow.on('closed', () => {
    visionTime.restart();
    visionWindow = null;
  });

  var theUrl = path.join(__dirname, '/modals/vision.html');

  visionWindow.loadFile(theUrl);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// save session to electron storage cookies store
ipcMain.on('get-cookies', async (event, arg) => {
  try {
    //get the sessions from db Sessions table
    const dbSessionsInfo = (await axios.get('http://localhost:8080/auth/me'))
      .data;
    //get sessions from electron cookies store
    const cookies = await session.defaultSession.cookies.get({});
    if (cookies.length > 0) {
      //compare sessions on eletron store with db
      //get matching session
      const [matchedCookie] = dbSessionsInfo.filter(
        session => session.sid === cookies[0].value
      );
      let id = matchedCookie.user.toString();
      const user = await axios.post('http://localhost:8080/auth/auto-login', {
        id,
      });
      event.reply('cookies-received', user);
    }
  } catch (error) {
    console.log('Error trying to auto-login\n', error);
  }
});

ipcMain.on('clear-session', async (event, arg) => {
  // remove all pre-existing sessions
  session.defaultSession.clearStorageData();
});
// below code executes after a successful login OR signup
ipcMain.on('successful-login-signup', async (event, info) => {
  try {
    const sessionCookie = {
      url: 'http://localhost/',
      name: info.user,
      value: info.sessionId,
      expirationDate: 12096000000, // =two weeks
    };
    // remove all pre-existing sessions
    session.defaultSession.clearStorageData();
    //save session for new login
    await session.defaultSession.cookies.set(sessionCookie);
  } catch (error) {
    console.log('cookie error:', error);
  }
});

// MINDFULNESS EVENTS
ipcMain.on('mindfulness-accepted', event => {
  event.reply('mindfulness-start-counter', mindTime.duration);
});

ipcMain.on('mindfulness-finished', () => {
  mindWindow.close();
  let currentSessions = currentUserSettings.get(
    'log.mindfulness.completed_sessions'
  );
  currentUserSettings.set(
    'log.mindfulness.completed_sessions',
    currentSessions + 1
  );
  mindTime.restart();
});

ipcMain.on('mindfulness-rejected', () => {
  mindWindow.close();
  mindTime.restart();
});

ipcMain.on('mindfulness-delayed', () => {
  mindWindow.close();
  mindTime.setDelay(60000 * 3);
});
// END MINDFULNESS EVENTS
//movement IPC
ipcMain.on('movement-accepted', event => {
  event.reply('movement-start-counter', moveTime.duration);
});

ipcMain.on('movement-finished', () => {
  moveWindow.close();
  let currentSessions = currentUserSettings.get(
    'log.movement.completed_sessions'
  );
  currentUserSettings.set(
    'log.movement.completed_sessions',
    currentSessions + 1
  );
  moveTime.restart();
});

ipcMain.on('movement-rejected', () => {
  moveWindow.close();
  moveTime.restart();
});

ipcMain.on('movement-delayed', () => {
  moveWindow.close();
  moveTime.setDelay(60000 * 3);
});
//end movement IPC

//vision IPC
ipcMain.on('vision-accepted', event => {
  event.reply('vision-start-counter', visionTime.duration);
});

ipcMain.on('vision-finished', () => {
  visionWindow.close();
  let currentSessions = currentUserSettings.get(
    'log.vision.completed_sessions'
  );
  currentUserSettings.set('log.vision.completed_sessions', currentSessions + 1);
  visionTime.restart();
});

ipcMain.on('vision-rejected', () => {
  visionWindow.close();
  visionTime.restart();
});

ipcMain.on('vision-delayed', () => {
  visionWindow.close();
  visionTime.setDelay(60000 * 3);
});
//end vision IPC

ipcMain.on('get-preferences', (event, arg) => {
  // make axios call to grab info for user
  // compare to the local store preferences (date modified?)
  // send back whichever is the more recent.
  event.reply('set-preferences', currentUserSettings.get());
});

ipcMain.on('main-app-init', (event, arg) => {
  // start the timer
  startTimer();
  startSyncTimer();

  const posturePref = getSetting('posture');
  const movePref = getSetting('movement');
  const visionPref = getSetting('vision');
  const hydrationPref = getSetting('hydration');
  const mindfulPref = getSetting('mindfulness');

  const activities = [
    posturePref,
    movePref,
    visionPref,
    hydrationPref,
    mindfulPref,
  ];
  // clear previous log
  currentUserSettings.delete('log');
  // initialize the log with null values
  activities.forEach(activity => {
    currentUserSettings.set(`log.${activity.name}`, {
      userPreferenceId: activity.userPreferenceId,
      month: month,
      date: date,
      completed_sessions: 0,
    });
  });
});

// called on main app mount
ipcMain.on('save-log', (event, arg) => {
  // set the user's activity log  in loca storage with the server activity log
  currentUserSettings.set('activityBackLog', arg);
  event.reply('log-saved', currentUserSettings.get());
});

ipcMain.on('set-preferences', (event, arg) => {
  currentUserSettings.set('userPreferences', arg);
});

//update timer for posture
ipcMain.on('updateTimer1', event => {
  const now = new Date().getTime();
  const posturePref = getSetting('posture');
  if (!posturePref.active) {
    pstTime.trigger = now - 60000;
  } else {
    pstTime.trigger = now + posturePref.frequency;
  }
  pstTime.frequency = posturePref.frequency;
  pstTime.duration = posturePref.duration;
  pstTime.active = posturePref.active;
});

//update timer for movement
ipcMain.on('updateTimer2', event => {
  const now = new Date().getTime();
  const movePref = getSetting('movement');
  if (!movePref.active) {
    moveTime.trigger = now - 60000;
  } else {
    moveTime.trigger = now + movePref.frequency;
  }
  moveTime.frequency = movePref.frequency;
  moveTime.duration = movePref.duration;
  moveTime.active = movePref.active;
});

//update timer for vision
ipcMain.on('updateTimer3', event => {
  const now = new Date().getTime();
  const visionPref = getSetting('vision');
  if (!visionPref.active) {
    visionTime.trigger = now - 60000;
  } else {
    visionTime.trigger = now + visionPref.frequency;
  }
  visionTime.frequency = visionPref.frequency;
  visionTime.duration = visionPref.duration;
  visionTime.active = visionPref.active;
});

//update timer for hydration
ipcMain.on('updateTimer4', event => {
  const now = new Date().getTime();
  const hydrationPref = getSetting('hydration');
  if (!hydrationPref.active) {
    hydroTime.trigger = now - 60000;
  } else {
    hydroTime.trigger = now + hydrationPref.frequency;
  }
  hydroTime.frequency = hydrationPref.frequency;
  hydroTime.duration = hydrationPref.duration;
  hydroTime.active = hydrationPref.active;
});

//update timer for mindfulness
ipcMain.on('updateTimer5', event => {
  const now = new Date().getTime();
  const mindfulPref = getSetting('mindfulness');
  if (!mindfulPref.active) {
    mindTime.trigger = now - 60000;
  } else {
    mindTime.trigger = now + mindfulPref.frequency;
  }
  mindTime.frequency = mindfulPref.frequency;
  mindTime.duration = mindfulPref.duration;
  mindTime.active = mindfulPref.active;
});

ipcMain.on('clear-timer', (event, arg) => {
  clearInterval(masterTimer);
  clearInterval(syncTimer);
});
