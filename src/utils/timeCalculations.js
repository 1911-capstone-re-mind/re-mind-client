export const millisecondsToHrMinSec = milliseconds => {
  const hours = Math.floor(milliseconds / 3600000);
  milliseconds -= hours * 3600000;
  const minutes = Math.floor(milliseconds / 60000);
  milliseconds -= minutes * 60000;
  const seconds = Math.floor(milliseconds / 1000)
  return [
    hours,
    minutes,
    seconds
  ]
}

export const millisecondsToMinSec = milliseconds => {
  const minutes = Math.floor(milliseconds / 60000);
  milliseconds -= minutes * 60000;
  const seconds = Math.floor(milliseconds / 1000)
  return [
    minutes,
    seconds
  ]
}

export const millisecondsToHrMin = milliseconds => {
  const hours = Math.floor(milliseconds / 3600000);
  milliseconds -= hours * 3600000;
  const minutes = Math.floor(milliseconds / 60000);
  return [
    hours,
    minutes,
  ]
}

export const validateTimes = (frequencyHours, frequencyMinutes, durationMinutes, durationSeconds, activityId) => {
  let hours = frequencyHours >= 0 && frequencyHours <= 8;
  let minutes = frequencyMinutes >= 0 && frequencyMinutes <= 59;
  let dMinutes
  let dSeconds
  if (activityId === 1 || activityId === 4) {
    dMinutes = true;
    dSeconds = true;
  } else {
    dMinutes = durationMinutes >= 0 && durationMinutes <= 59;
    dSeconds = durationSeconds >= 0 && durationSeconds <= 59;
  }
  return hours && minutes && dMinutes && dSeconds;
}
