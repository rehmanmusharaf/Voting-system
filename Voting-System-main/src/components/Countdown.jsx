import React, { useEffect, useState } from "react";
import "./Countdown.css";
import { Link } from "react-router-dom";
import ElectionProgress from "./pages/Admin/ElectionProgress";
import axios from "axios";
import { useAuth } from "./Context/Auth";
const Countdown = ({ election }) => {
  const [auth] = useAuth();
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
    // console.log("target date", targetDate);
    // console.log("calculated time left!", difference);
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
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/getpublicvotedusers`,
        {
          withCredentials: true,
        }
      );
      setCastedvoterscount(data.castedVotersCount);
      // }
    } catch (error) {
      // console.log("during voters get error:",error)
    }
  };

  useEffect(() => {
    // console.log(targetDate);
    // electiondatecheck();
    setCurrentdate(new Date());
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
                {auth.user ? (
                  <h2>Result Announcement</h2>
                ) : (
                  <h2>Plaese Login To See The Result</h2>
                )}
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
