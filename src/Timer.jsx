import React, { useState, useContext, useEffect } from 'react';
import RoomContext from './context';
import { getSecondsLeft, parseTime } from './utils';

const Timer = () => {
  const { startTime, setNextTraderId } = useContext(RoomContext);
  const [secondsLeft, setSecondsLeft] = useState(getSecondsLeft(startTime));

  useEffect(() => {
    setTimeout(() => {
      if (secondsLeft === 1) {
        setNextTraderId();
      }
      setSecondsLeft(getSecondsLeft(startTime));
    }, 1000);
  }, [secondsLeft]);

  return <div className="text-danger">{parseTime(secondsLeft)}</div>;
};

export default Timer;
