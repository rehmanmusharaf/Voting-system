import React, { useEffect, useState } from "react";
import "./Countdown.css";
import { Link } from "react-router-dom";
import ElectionProgress from "./pages/Admin/ElectionProgress";
import axios from "axios";
const Countdown = ({ election }) => {
  let [index, setIndex] = useState(0);
  const [currentdate, setCurrentdate] = useState(new Date());
  const [castedvoterscount, setCastedvoterscount] = useState();
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

  const getvotecasted = async () => {
    try {
      console.log("get voted User date function RUn!");
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/getvotedusers`,
        {
          withCredentials: true,
        }
      );
      console.log("voted users data", data);
      // setCastedvoters(data.users);
      setCastedvoterscount(data.castedVotersCount);
    } catch (error) {
      // console.log("during voters get error:",error)
    }
  };

  useEffect(() => {
    // console.log(targetDate);
    // electiondatecheck();
    // setCurrentdate(new Date());
    // console.log("election end date", election.enddate);
    if (new Date() >= new Date(election.enddate) && index == 0) {
      getvotecasted();
      setIndex(1);
    }
    // if (election) {
    // console.log("election data on countdown componenet:", election);
    // }
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, election]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} className="child-intrevals">
        <span className=" display-4 ">{timeLeft[interval]}</span> {interval}
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
            {new Date(election.enddate) < currentdate ? (
              <>
                <h2>Result Announcement</h2>
                {castedvoterscount >= 0 && (
                  <ElectionProgress castedvoterslength={castedvoterscount} />
                )}
              </>
            ) : (
              <h2 className=" display-5">Election Will End In</h2>
            )}
          </>
        ) : (
          <h2 className=" display-5">Election Will Start In</h2>
        )}
        {timerComponents.length ? (
          <>
            <div className="intervals-parent">{timerComponents}</div>
          </>
        ) : (
          <>
            {timesup()}
            <span>Time's up!</span>
          </>
        )}
        {new Date(election.startdate) <= currentdate &&
        new Date(election.enddate) > currentdate ? (
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
