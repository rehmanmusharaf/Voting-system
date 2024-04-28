import React, { useEffect, useState } from "react";
import "./Countdown.css";
import { Link } from "react-router-dom";
const Countdown = ({ election }) => {
  const currentdate = new Date();
  // let [electionend, setElectionend] = useState(false);
  const targetDate =
    new Date(election.startdate) >= currentdate
      ? new Date(election.startdate)
      : new Date(election.enddate);
  // if (new Date(election.startdate) <= currentdate) {
  // electionend = true;
  // console.log("Election End COndition Run");
  // setElectionend(true);
  // }
  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  function timesup() {}
  useEffect(() => {
    // console.log(targetDate);
    // electiondatecheck();
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} className="child-intrevals">
        <span className=" display-4 ">{timeLeft[interval]}</span> {interval}{" "}
      </span>
    );
  });

  return (
    <>
      <div className="timer container pb-5 ">
        <h3 className=" text-decoration-underline ">
          {election.election_name}
        </h3>
        {new Date(election.startdate) <= currentdate ? (
          <>
            <h2 className=" display-5">Election Will End In</h2>
          </>
        ) : (
          <h2 className=" display-5">Election Will Start In</h2>
        )}
        {timerComponents.length ? (
          <div className="intervals-parent">{timerComponents}</div>
        ) : (
          <>
            {timesup()}
            <span>Time's up!</span>
          </>
        )}
        {new Date(election.startdate) <= currentdate ? (
          <Link
            className="button position-relative"
            style={{ top: "20px" }}
            to="/ballot"
          >
            Cast vote
          </Link>
        ) : null}
      </div>
    </>
  );
};

export default Countdown;
