import React, { useEffect, useState } from "react";
import "./VoterDashboard.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import image1 from "./images/bg-image.jpg";
import { useElections } from "../Context/election";
function VoterDashboard() {
  let [auth] = useAuth();
  let [election] = useElections();
  let [dob, setDob] = useState(null);
  useEffect(() => {
    if (auth.user) {
      let date = auth.user.dob;
      setDob(date.split("T")[0]);
    }
  }, [auth]);
  return (
    <>
      <div className="voter-dashboard">
        <header>
          <h2>Registered Voter Dashboard</h2>
        </header>
        <main>
          <div className="box-container">
            <div className="election-info">
              <div className="info-wrapper">
                <h3>Upcoming Election</h3>
                {election && election.length > 0 && (
                  <>
                    <ul className="election-date">
                      <li>
                        <span>Opens: </span>
                        {election[0]?.startdate}
                      </li>
                      <li>
                        <span>Closes: </span>
                        {election[0]?.enddate}
                      </li>
                      <li>
                        <span>Hours: </span>&nbsp;9:00 a.m. to 5.00 p.m.
                      </li>
                    </ul>
                    <ul className="info">
                      <li>Gilgit, Pakistan</li>
                      <li>Member of Parliament</li>
                    </ul>
                  </>
                )}
              </div>
            </div>
            <div className="voter-info">
              <div className="info-wrapper">
                <h3>Voter Profile</h3>
                {auth && auth.user && (
                  <div className="voter-details">
                    <div className="titles">
                      <div>Voter ID:</div>
                      <div>Full Name:</div>
                      <div>Date of Birth:</div>
                      <div>Constituency:</div>
                    </div>
                    <div className="description">
                      <div>{auth.user.voter_id}</div>
                      <div>{auth.user.full_name}</div>
                      <div>{dob}</div>
                      <div>{auth.user.constituency}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="start-vote">
            <div className="text-div">
              <h2>Cast Vote!</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                fringilla, libero in interdum rutrum, dolor leo sodales mauris,
                non posuere mi turpis sed dolor. Phasellus diam neque, congue in
                ornare non, vestibulum vel ante.
              </p>
              <Link to="/ballot" className="button">
                Vote
              </Link>
            </div>
            <div className="img-div">
              <img src={image1} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default VoterDashboard;
