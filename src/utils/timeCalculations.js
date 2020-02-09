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

export const validateTimes = (frequencyHours, frequencyMinutes, frequencySeconds, durationMinutes, durationSeconds, activityId) => {
  let hours = frequencyHours >= 0 && frequencyHours <= 8;
  let minutes = frequencyMinutes >= 0 && frequencyMinutes <= 59;
  let seconds = frequencySeconds >= 0 && frequencySeconds <= 59;
  let dMinutes
  let dSeconds
  if (activityId === 1 || activityId === 4) {
    dMinutes = true;
    dSeconds = true;
  } else {
    dMinutes = durationMinutes >= 0 && durationMinutes <= 60;
    dSeconds = durationSeconds >= 0 && durationSeconds <= 60;
  }
  return hours && minutes && seconds && dMinutes && dSeconds;
}
