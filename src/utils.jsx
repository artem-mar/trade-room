export const parseTime = (num) => {
  const minutes = Math.trunc(num / 60).toString().padStart(2, '0');
  const seconds = (num % 60).toString().padStart(2, '0');
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
  const shifts = periodsNumber % ids.length;
  const currentIdIndex = startingIdIndex + shifts >= ids.length
    ? shifts - (ids.length - startingIdIndex)
    : startingIdIndex + shifts;
  return ids[currentIdIndex];
};
