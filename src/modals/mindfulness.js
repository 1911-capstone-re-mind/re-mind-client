const { ipcRenderer } = require('electron')

const yes = document.getElementById('yes')
const no = document.getElementById('no')
const delay = document.getElementById('delay')
const mindfulness = document.getElementById('mindfulness')



yes.addEventListener('click', () => {
  ipcRenderer.send('mindfulness-accept')
})

no.addEventListener('click', () => {
  ipcRenderer.send('mindfulness-reject')
})

delay.addEventListener('click', () => {
  ipcRenderer.send('mindfulness-delay')
})

ipcRenderer.on('start-counter', (event, duration) => {
  const counter = document.createElement("DIV")
  const prompt = document.getElementById('prompt')
  prompt.style.display = "none"
  let durationToSeconds = duration / 1000
  counter.innerText = 'Ready?'
  mindfulness.replaceChild(counter, mindfulness.firstChild)
  const intervalId = setInterval(() => {
    if (durationToSeconds <= 0) {
      clearInterval(intervalId)
      ipcRenderer.send('finish-mindfulness')
    }
    counter.innerHTML = durationToSeconds
    durationToSeconds--
  }, 1000)
})

