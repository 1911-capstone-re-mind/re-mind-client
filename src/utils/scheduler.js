class Scheduler {
  constructor(
    trigger,
    frequency,
    duration,
    active
    ) {
    this.trigger = trigger
    this.frequency = frequency
    this.duration = duration
    this.active = active
  }

  setNextNotif() {
    this.trigger += this.frequency + this.duration
  }
  //time in milliseconds
  setDelay(time) {
    this.trigger = new Date().getTime() + time
  }

  restart() {
    this.active = true
    this.trigger = new Date().getTime() + this.frequency
  }

  disable() {
    this.active = false
  }
}

module.exports = Scheduler
