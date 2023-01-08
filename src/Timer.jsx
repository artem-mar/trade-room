import React, { useState, useContext, useEffect } from 'react';
import RoomContext from './context';
import { getSecondsLeft, parseTime } from './utils';

const Timer = () => {
  const { startTime, setCurrentTraderId } = useContext(RoomContext);
  const [secondsLeft, setSecondsLeft] = useState(getSecondsLeft(startTime));

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (secondsLeft === 1 || secondsLeft === 120) {
        setCurrentTraderId();
      }
      setSecondsLeft(getSecondsLeft(startTime));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  return <div className="text-danger">{parseTime(secondsLeft)}</div>;
};

export default Timer;
