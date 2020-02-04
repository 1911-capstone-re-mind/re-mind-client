const { ipcRenderer } = require('electron')

const yes = document.getElementById('yes')
const no = document.getElementById('no')
const delay = document.getElementById('delay')
const vision = document.getElementById('vision')



yes.addEventListener('click', () => {
  ipcRenderer.send('vision-accepted')
})

no.addEventListener('click', () => {
  ipcRenderer.send('vision-rejected')
})

delay.addEventListener('click', () => {
  ipcRenderer.send('vision-delayed')
})

ipcRenderer.on('vision-start-counter', (event, duration) => {
  const counter = document.createElement("DIV")
  const prompt = document.getElementById('prompt')
  prompt.style.display = "none"
  let durationToSeconds = duration / 1000
  counter.innerText = 'Ready?'
  vision.replaceChild(counter, vision.firstChild)
  const intervalId = setInterval(() => {
    if (durationToSeconds <= 0) {
      clearInterval(intervalId)
      ipcRenderer.send('vision-finished')
    }
    counter.innerHTML = durationToSeconds
    durationToSeconds--
  }, 1000)
})

