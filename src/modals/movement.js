const { ipcRenderer } = require('electron')

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
  let durationToSeconds = duration / 1000
  counter.innerText = 'Ready?'
  movement.replaceChild(counter, movement.firstChild)
  const intervalId = setInterval(() => {
    if (durationToSeconds <= 0) {
      clearInterval(intervalId)
      ipcRenderer.send('movement-finished')
    }
    counter.innerHTML = durationToSeconds
    durationToSeconds--
  }, 1000)
})

