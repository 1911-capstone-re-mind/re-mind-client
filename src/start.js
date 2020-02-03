const electron = require("electron");
const { remote } = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain  = electron.ipcMain
const differrenceInMinutes = require('date-fns/differenceInMinutes');
const differenceInSeconds = require('date-fns/differenceInSeconds');
const Notification = electron.Notification
const Store = require('electron-store')
const Scheduler = require('./utils/scheduler')

const path = require("path");
const url = require("url");
const defaults = require('./utils/defaultSettings')
let currentUserSettings = new Store({defaults})
console.log("TCL: currentUserSettings", currentUserSettings._defaultValues)

let mainWindow;
let mindWindow;
// let postureFreq = 15000//20 * 60000;
// let movementFreq = 60000//60 * 60000;
// let lookFreq = 20000//20 * 60000;
// let hydrationFreq = 60 * 60000;
// let mindfullFreq = 240 * 60000; // every 4 hrs???

//timers
  const now = new Date().getTime();

  let pstTime = new Scheduler(now+currentUserSettings._defaultValues.posture.frequency, currentUserSettings._defaultValues.posture.frequency, currentUserSettings._defaultValues.posture.duration, true);
  let moveTime = new Scheduler(now+currentUserSettings._defaultValues.movement.frequency, currentUserSettings._defaultValues.movement.frequency, currentUserSettings._defaultValues.movement.duration, true );
  let lookTime = new Scheduler(now+currentUserSettings._defaultValues.vision.frequency, currentUserSettings._defaultValues.vision.frequency, currentUserSettings._defaultValues.vision.duration, true);
  let hydroTime = new Scheduler(now+currentUserSettings._defaultValues.hydration.frequency, currentUserSettings._defaultValues.hydration.frequency, currentUserSettings._defaultValues.hydration.duration, true);
  let mindTime = new Scheduler(now+currentUserSettings._defaultValues.mindfulness.frequency, currentUserSettings._defaultValues.mindfulness.frequency, currentUserSettings._defaultValues.mindfulness.duration, true);

  function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.webContents.openDevTools()
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


  // let test9Sec = now + 60000;

  setInterval(() => {
    const now = new Date().getTime();
    let time;
    console.log("TCL: now", new Date().getSeconds())

    // if (differenceInSeconds(now, test9Sec) > 9) {
    //   console.log(new Date().getSeconds());
    //   sendNotification('60 seconds', 'test mess');
    //   test9Sec += 60000;
    // }
    console.log("TCL: pstTime", pstTime)

    // notifications only
    if (now >= pstTime.trigger && pstTime.active) {
    // if (differrenceInMinutes(now, pstTime) > 20) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      console.log("TCL: time", time)
      sendNotification('Posture', 'What sort of sitting is that?')
      console.log(`Notification for posture sent at ${time}`)
      pstTime.setNextNotif()
    }

    if (now >= hydroTime.trigger && hydroTime.active) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      sendNotification('Thirsty?', 'Drink some H2O.')
      console.log(`Notification for hydration sent at ${time}`)
      hydroTime.setNextNotif()
    }

    // modal screen
    if (now >= moveTime.trigger && moveTime.active) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      sendNotification('Time to move!!!', 'Step away from your desk! No, seriously, just go!')
      console.log(`Notification for movement sent at ${time}`)
      moveTime.setNextNotif()
    }

    if (now >= lookTime.trigger && lookTime.active) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      sendNotification('Take care of your eyes!', 'Look at an object at least 20 ft away for 20 seconds.')
      console.log(`Notification for 20/20/20 sent at ${time}`)
      lookTime.setNextNotif()
    }


    if (now >= mindTime.trigger && mindTime.active) {
      time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
      openModal('mindfulness')
      console.log(`Notification for mindfulness sent at ${time}`)
      mindTime.disable()
    }
  }, 1000);
}

function sendNotification(title, message) {
  const notif = new Notification({
    title: title,
    body: message,
  });
  notif.show();
}

function openModal(activity) {
  mindWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {nodeIntegration:true}
  })
  mindWindow.webContents.openDevTools()
  mindWindow.on('closed', () => { mindWindow = null})


  var theUrl = path.join(__dirname, `/modals/${activity}.html`)
  console.log('url', theUrl);

  mindWindow.loadFile(theUrl);
}

app.on("ready", createWindow);

app.on("ready", startTimer)

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

ipcMain.on('mindfulness-accept', (event) => {
  event.reply('start-counter', mindTime.duration )
})

ipcMain.on('finish-mindfulness', () => {
  mindWindow.close()
  mindTime.restart()
})

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

