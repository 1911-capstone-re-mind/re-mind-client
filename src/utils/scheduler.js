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
    this.inProgress = false
  }

  setNextNotif() {
    this.trigger += this.frequency + this.duration
  }
  //time in milliseconds
  setDelay(time) {
    this.inProgress = false
    this.trigger = new Date().getTime() + time
  }

  restart() {
    this.inProgress = false
    this.trigger = new Date().getTime() + this.frequency
  }

  disable() {
    this.active = false
    this.inProgress = false
  }

}

module.exports = Scheduler
