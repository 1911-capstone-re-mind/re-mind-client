//functions and set up for communicating from render process to main process

const { ipcRenderer } = require("electron");

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

export const clearTimer = () => {
  ipcRenderer.send("clear-timer");
}

// save the user's preferences to the file system
export const setPreferences = prefs => {
  ipcRenderer.send("set-preferences", prefs);
};

//update timer of single activity
export const updateTimer = activityId => {
  ipcRenderer.send(`updateTimer${activityId}`)
}
