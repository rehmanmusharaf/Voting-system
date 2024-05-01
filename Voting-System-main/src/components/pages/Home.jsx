import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import "./Home.css";
import Card from "../Card";
import Countdown from "../Countdown.jsx";
import Parties from "../Parties.jsx";
import { useSymbols } from "../Context/Symbol.js";
import { useElections } from "../Context/election.js";
function Home() {
  let [election] = useElections();
  let [symbols] = useSymbols();
  const [auth] = useAuth();
  useEffect(() => {
    // console.log("Election Name is:", process.env.REACT_APP_electionname);
    // console.log("election array is:", election);
    // console.log("Symbol is:", symbols);
  }, [symbols]);
  return (
    <div className="">
      {/* {
        election&&election.length>0? */}
      {election &&
        election.length > 0 &&
        election.map((value, index) => (
          <Countdown election={value} key={index} />
        ))}
      {/* // :; // } */}
      <div className="container" style={{ margin: "0px auto" }}>
        <Parties />
      </div>
      <div className="content">
        <main>
          <div className="head-wrap">
            <div className="head">
              <h2>Register to Vote</h2>
              <p>
                Register here to vote online for the prosperity of Gilgit. The
                process tales only a minute.
              </p>
              <Link to="/voter-signup" className="button">
                Register
              </Link>
            </div>
          </div>
          <Card
            className="card"
            title="Election Commission Officer"
            description="If you have already registered as a voter, then login to voter dashboard and see if there is voting going on."
            button_text="Login"
            path="/admin-login"
          />
          <Card
            className="card"
            title="Registered Voter"
            description="If you have already registered as a voter, then login to voter dashboard and see if there is voting going on."
            button_text="Login"
            path="/voter-login"
          />
          <Card
            className="card"
            title="Perspective Voter"
            description="If you have already registered as a voter, then login to voter dashboard and see if there is voting going on."
            button_text="Register"
            path="/voter-signup"
          />
        </main>
      </div>
    </div>
  );
}

export default Home;
