import Scheduler from "./scheduler";
import {
  millisecondsToHrMinSec,
  millisecondsToMinSec,
  millisecondsToHrMin,
  validateTimes
} from "./timeCalculations";

describe("utility functions and classes", () => {
  describe("scheduler", () => {

    it("creates a class with trigger, frequency, duration, active, and inProgress properties", () => {
      const scheduler = new Scheduler(4000000, 60000, 60000, true);
      expect(scheduler.trigger).toEqual(4000000);
      expect(scheduler.frequency).toEqual(60000);
      expect(scheduler.duration).toEqual(60000);
      expect(scheduler.active).toEqual(true);
    })

    it("setNextNotif method adds the frequnecy to the trigger", () => {
      const scheduler = new Scheduler(4000000, 60000, null, true);
      scheduler.setNextNotif();
      expect(scheduler.trigger).toEqual(4060000);
    })

    it("setDelay method delays the trigger for the given amount of time and sets inProgress to false", () => {
      const scheduler = new Scheduler(4000000, 60000, 60000, true);
      const now = new Date().getTime();
      scheduler.setDelay(2000000);
      expect(scheduler.trigger).toEqual(now + 2000000);
      expect(scheduler.inProgress).toEqual(false);
    })

    it("restart method sets the trigger to the current time plus the frequency and sets inProgress to false", () => {
      const scheduler = new Scheduler(4000000, 60000, 60000, true);
      const now = new Date().getTime();
      scheduler.restart();
      expect(scheduler.trigger).toEqual(now + 60000);
      expect(scheduler.inProgress).toEqual(false);
    })

    it("disable disables the scheduler and sets inProgress to false", () => {
      const scheduler = new Scheduler(4000000, 60000, 60000, true);
      scheduler.disable()
      expect(scheduler.active).toEqual(false);
      expect(scheduler.inProgress).toEqual(false);
    })

  })

  describe("time conversion and validations", () => {
    describe("millisecondsToHrMinSec", () => {
      it("converts milliseconds to hour, minutes, seconds correctly", () => {
        const conversion = millisecondsToHrMinSec(6604000);
        expect(conversion[0]).toEqual(1);
        expect(conversion[1]).toEqual(50);
        expect(conversion[2]).toEqual(4);
      })
    })

    describe("millisecondsToMinSec", () => {
      it("converts milliseconds to minutes, seconds correctly", () => {
        const conversion = millisecondsToMinSec(3004000);
        expect(conversion[0]).toEqual(50);
        expect(conversion[1]).toEqual(4);
      })
    })

    describe("millisecondsToHrMin", () => {
      it("converts milliseconds to hour, minutes correctly", () => {
        const conversion = millisecondsToHrMin(6600000);
        expect(conversion[0]).toEqual(1);
        expect(conversion[1]).toEqual(50);
      })
    })

    describe("validateTimes", () => {
      it("returns true for allowed time values and rejects ones that are out of range", () => {
        expect(validateTimes(1, 20, 2, 4, 2)).toEqual(true);
        expect(validateTimes(9, 20, 2, 4, 2)).toEqual(false);
        expect(validateTimes(1, 20, null, null, 1)).toEqual(true);
        expect(validateTimes(9, 20, null, null, 1)).toEqual(false);
      })
    })
  })
})
