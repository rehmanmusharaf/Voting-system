import React, { useEffect, useState } from "react";
import "./Countdown.css";
const Countdown = () => {
  // { targetDate }
  const targetDate = new Date("2024-12-31T00:00:00");
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

  useEffect(() => {
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
    <div className="timer container">
      <h2 className=" display-5">Election Will Start In</h2>
      {timerComponents.length ? (
        <div className="intervals-parent">{timerComponents}</div>
      ) : (
        <span>Time's up!</span>
      )}
      <h2 className=" display-7 text-start ">Registered Parties</h2>
      <div className="">
        <div class="">
          <section class="mx-auto my-5" style={{ maxWidth: "23rem" }}>
            <div class="card testimonial-card mt-2 mb-3">
              <img
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2831%29.jpg"
                class="card-up "
                alt="woman avatar"
              />
              <div class="avatar mx-auto white">
                <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2831%29.jpg"
                  class="rounded-circle img-fluid"
                  alt="woman avatar"
                />
              </div>
              <div class="card-body text-center">
                <h4 class="card-title font-weight-bold">Martha Smith</h4>
                <hr />
                <p>
                  <i class="fas fa-quote-left"></i> Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Eos, adipisci
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
