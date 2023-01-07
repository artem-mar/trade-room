export const parseTime = (num) => {
  const minutes = Math.trunc(num / 60) < 10 ? `0${Math.trunc(num / 60)}` : Math.trunc(num / 60);
  const seconds = num % 60 < 10 ? `0${num % 60}` : num % 60;
  return [minutes, seconds].join(' : ');
};

export const getSecondsLeft = (startTime) => {
  const timeDifferenceSec = Math.trunc((Date.now() - startTime) / 1000);
  const secondsLeft = 120 - (timeDifferenceSec % 120);
  return secondsLeft;
};

export const getCurrentId = (ids, startingId, startTime) => {
  const timeDifferenceSec = Math.trunc((Date.now() - startTime) / 1000);
  const periodsNumber = Math.trunc(timeDifferenceSec / 120);
  const startingIdIndex = ids.indexOf(startingId);
  const currentIdIndex = startingIdIndex + (periodsNumber % ids.length);
  return ids[currentIdIndex];
};
