export const parseTime = (num) => {
  const minutes = Math.trunc(num / 60) < 10 ? `0${Math.trunc(num / 60)}` : Math.trunc(num / 60);
  const seconds = num % 60 < 10 ? `0${num % 60}` : num % 60;
  return [minutes, seconds].join(' : ');
};

export const getSecondsLeft = (startTime, timerDuration = 120) => {
  const timeDifferenceSec = Math.trunc((Date.now() - startTime) / 1000);
  const secondsLeft = timerDuration - (timeDifferenceSec % timerDuration);
  return secondsLeft;
};

export const getCurrentId = (items, startingId, startTime) => {
  const ids = items.map((i) => i.id);
  const timeDifferenceSec = Math.trunc((Date.now() - startTime) / 1000);
  const periodsNumber = Math.trunc(timeDifferenceSec / 120);
  const startingIdIndex = ids.indexOf(startingId);
  const swipes = periodsNumber % ids.length;
  const currentIdIndex = startingIdIndex + swipes >= ids.length
    ? swipes - (ids.length - startingIdIndex)
    : startingIdIndex + swipes;
  return ids[currentIdIndex];
};
