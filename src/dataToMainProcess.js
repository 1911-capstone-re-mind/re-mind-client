//functions and set up for communicating from render process to main process

const { ipcRenderer } = window.require("electron");

ipcRenderer.on("settings-change-success", (event, message) => {
  //set message in chat window to confirm success
  console.log(message);
});

ipcRenderer.on("settings-change-failure", (event, message) => {
  //set message in chat window to report failure
  console.log("oops");
});

ipcRenderer.on("delay-success", (event, message) => {
  //set message in chat window to confirm success
  console.log(message);
});

ipcRenderer.on("delay-failure", (event, message) => {
  //set message in chat window to report failure
  console.log("oops delay failure");
});

ipcRenderer.on("cancel-success", (event, message) => {
  //set message in chat window to confirm success
  console.log(message);
});

ipcRenderer.on("cancel-failure", (event, message) => {
  //set message in chat window to report failure
  console.log("oops delay failure");
});

//change user notificaition settings
export const sendSettingsToMain = settings => {
  ipcRenderer.send("change-settings", settings);
};

export const sendDelayToMain = settings => {
  ipcRenderer.send("set-delay", settings);
};

export const sendCancelToMain = settings => {
  ipcRenderer.send("cancel-all", settings);
};

export const initTimer = () => {
  ipcRenderer.send("main-app-init");
};

// save the user's activity log to file system
export const saveLog = log => {
  ipcRenderer.send("save-log", log);
};

// save the user's preferences to the file system
export const savePreferences = prefs => {
  ipcRenderer.send("save-preferences", prefs);
};

export const setPreferences = prefs => {
  ipcRenderer.send("set-preferences", prefs);
};
