import React, { useState, useEffect } from "react";
import "./Cowntdown.css";

const Countdown = ({ trips, weatherToday }) => {
  const currentDate = new Date().getTime();

  const countDown = trips.find(
    (trip) => trip.city === weatherToday?.address
  ).startDate;

  const countDownDate = new Date(
    countDown.split(".").reverse().join("-")
  )?.getTime();

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeleft = countDownDate - currentDate;
      setDays(Math.floor(timeleft / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((timeleft % (1000 * 60)) / 1000));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentDate, countDownDate]);

  return (
    <div className="countdown">
      <div>
        <p className="countdown-num">{days}</p>
        <p className="countdown-text">days</p>
      </div>
      <div>
        <p className="countdown-num">{hours}</p>
        <p className="countdown-text">hours</p>
      </div>
      <div>
        <p className="countdown-num">{minutes}</p>
        <p className="countdown-text">minutes</p>
      </div>
      <div>
        <p className="countdown-num">{seconds}</p>
        <p className="countdown-text">seconds</p>
      </div>
    </div>
  );
};

export default Countdown;
