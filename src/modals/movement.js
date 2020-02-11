const { ipcRenderer } = require('electron');

const millisecondsToMinSec = milliseconds => {
  const minutes = Math.floor(milliseconds / 60000);
  milliseconds -= minutes * 60000;
  const seconds = Math.floor(milliseconds / 1000)
  return [
    minutes,
    seconds
  ];
};

const yes = document.getElementById('yes')
const no = document.getElementById('no')
const delay = document.getElementById('delay')
const movement = document.getElementById('movement')

yes.addEventListener('click', () => {
  ipcRenderer.send('movement-accepted')
})

no.addEventListener('click', () => {
  ipcRenderer.send('movement-rejected')
})

delay.addEventListener('click', () => {
  ipcRenderer.send('movement-delayed')
})

ipcRenderer.on('movement-start-counter', (event, duration) => {
  const counter = document.createElement("DIV")
  const prompt = document.getElementById('prompt')
  prompt.style.display = "none"
  counter.innerText = 'Ready?'
  movement.replaceChild(counter, movement.firstChild)
  const intervalId = setInterval(() => {
    let [ durationMinutes, durationSeconds ] = millisecondsToMinSec(duration)
    let durationMessage = '';

    if (durationMinutes <= 0 && durationSeconds <= 0) {
      clearInterval(intervalId)
      ipcRenderer.send('movement-finished')
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
  }, 1000)
})

