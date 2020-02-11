const { ipcRenderer } = require("electron");

const millisecondsToMinSec = milliseconds => {
  const minutes = Math.floor(milliseconds / 60000);
  milliseconds -= minutes * 60000;
  const seconds = Math.floor(milliseconds / 1000);
  return [minutes, seconds];
};

const yes = document.getElementById("yes");
const no = document.getElementById("no");
const delay = document.getElementById("delay");

const mindfulness = document.getElementById("mindfulness");

yes.addEventListener("click", () => {
  ipcRenderer.send("mindfulness-accepted");
});

no.addEventListener("click", () => {
  ipcRenderer.send("mindfulness-rejected");
});

delay.addEventListener("click", () => {
  ipcRenderer.send("mindfulness-delayed");
});

ipcRenderer.on("mindfulness-start-counter", (event, duration) => {
  const counter = document.createElement("DIV");
  const prompt = document.getElementById("prompt");
  prompt.style.display = "none";
  counter.className = "counter";
  counter.innerText = "Ready?";
  mindfulness.replaceChild(counter, mindfulness.firstChild);
  const intervalId = setInterval(() => {
    let [durationMinutes, durationSeconds] = millisecondsToMinSec(duration);
    let durationMessage = "";

    if (durationMinutes <= 0 && durationSeconds <= 0) {
      clearInterval(intervalId);
      ipcRenderer.send("mindfulness-finished");
    }

    if (durationMinutes > 9) {
      durationMessage += durationMinutes + ":";
    } else if (durationMinutes > 0) {
      durationMessage += "0" + durationMinutes + ":";
    } else {
      durationMessage += "00:";
    }

    if (durationSeconds > 9) {
      durationMessage += durationSeconds;
    } else {
      durationMessage += "0" + durationSeconds;
    }
    counter.innerHTML = durationMessage;
    duration -= 1000;
  }, 1000);
});
