import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import "./Home.css";
import Card from "../Card";
import Countdown from "../Countdown.jsx";
import Parties from "../Parties.jsx";
import { useSymbols } from "../Context/Symbol.js";
import { useElections } from "../Context/election.js";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
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
      {/* //integrating home section */}
      <>
        <div className="container-fluid">
          {/*----------------Hero Section----------- */}
          <section className="row hero-section text-center py-3 px-4 my-4">
            <div className="col-lg-6 mb-md-5 my-lg-auto">
              <h1 className="fs-2 mb-lg-4">General Election Voting System</h1>
              <p className="text-justify">
                Welcome to Gilgit Election Voting System, where democracy meets
                innovation. We believe that every voice matters, and we're here
                to empower you to make a difference. With our secure and
                user-friendly online voting platform, you can participate in
                elections from anywhere, at any time. Join us in shaping the
                future of democracy and ensuring that your voice is heard.
                Together, let's build a more inclusive and participatory
                society. Vote with confidence. Vote with GEVS.
              </p>
            </div>
            <div className="col-lg-6 text-lg-end text-center my-auto">
              <img
                className="img-fluid w-75  rounded"
                // src="https://t4.ftcdn.net/jpg/00/69/20/79/360_F_69207909_BbQA64naIlZdUKfLsdwL9vDmvYT56l88.jpg"
                src="./images/bg-image.jpg"
                alt="voting-ballot"
              />
            </div>
          </section>
          {/*----------------Registration/Login Section---------------- */}
          <section className="registration-login-section py-5 px-4">
            <div
              className="container div-center"
              style={{ background: "none" }}
            >
              <h2 className="text-center mb-5">Registration / Login</h2>
              <div className="row">
                <div className="col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-body text-center py-4">
                      <h3 className="card-title">Admin Login</h3>
                      <p className="card-text text-center">
                        Login as an Election Commission Officer to manage the
                        system.
                      </p>
                      <Link to="/admin-login" className="btn button">
                        Admin Login
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-body text-center py-4">
                      <h3 className="card-title">Voter Registration</h3>
                      <p className="card-text text-center">
                        Register as a voter to participate in elections.
                      </p>
                      <Link to="/voter-signup" className="btn button">
                        Register Now
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-body text-center py-4">
                      <h3 className="card-title">Voter Login</h3>
                      <p className="card-text text-center">
                        Login as a registered voter to cast your vote.
                      </p>
                      <Link to="/voter-login" className="btn button">
                        Voter Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*----------------Parties Section---------------- */}
          <section className="parties-details h-auto ">
            <div className="container" style={{ margin: "0px auto" }}>
              <Parties />
            </div>
          </section>
          {/*----------------Election-Schedule Section---------------- */}
          <section className="election-schedule h-auto ">
            {/* {
        election&&election.length>0? */}
            {election &&
              election.length > 0 &&
              election.map((value, index) => (
                <Countdown election={value} key={index} />
              ))}
          </section>
          {/*----------------About Section---------------- */}
          <section className="about-section py-7">
            <div className="about-overlay"></div>
            <div className="container" style={{ margin: "0px auto" }}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="about-content">
                    <h2>About Our Voting System</h2>
                    <p>
                      Our online voting system provides a secure and convenient
                      way for citizens to participate in the democratic process.
                      With our user-friendly platform, voters can register,
                      learn about candidates, and cast their ballots from the
                      comfort of their own homes. We are committed to ensuring
                      the integrity and fairness of elections, with robust
                      security measures in place to protect against fraud and
                      unauthorized access. Our system is designed to provide
                      transparency and accountability at every stage of the
                      voting process. Whether you're a first-time voter or a
                      seasoned participant, our online voting system makes it
                      easy to exercise your right to vote and make your voice
                      heard in the democratic process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*----------------How it works Section---------------- */}
          <section className="how-it-works-section py-5">
            <div
              className="container"
              style={{ margin: "0px auto", background: "none" }}
            >
              <h2 className="text-center mb-5">How It Works</h2>
              <div className="row">
                <div className="col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <h3 className="card-title">1. Register as a Voter</h3>
                      <p className="card-text text-center">
                        Register yourself as a voter by providing your details
                        and verifying your identity.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <h3 className="card-title">2. Login as a Voter</h3>
                      <p className="card-text text-center">
                        Login to your voter account using your credentials to
                        access the voting interface.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <h3 className="card-title">3. Cast Your Vote</h3>
                      <p className="card-text text-centers">
                        Select your preferred candidate from the available
                        options and submit your vote.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*----------------Contact Us Section---------------- */}
          <section className="contact-us py-3 px-4 my-4">
            <div className="container div-center">
              <div className="row">
                <div className="col-12 mb-4">
                  <h2 className="section-heading text-center mb-5">
                    Contact Us
                  </h2>
                  <div className="row">
                    <div className="col-lg-4 text-center mb-md-4 mb-4">
                      <CallIcon sx={{ fontSize: 40 }} />
                      <p className="contact-info">
                        <strong>Phone:</strong> +1 (123) 456-7890
                      </p>
                    </div>
                    <div className="col-lg-4 text-center mb-md-4 mb-4">
                      <Link className="link" to="/">
                        <MailIcon sx={{ fontSize: 40 }} />
                      </Link>

                      <p className="contact-info">
                        <strong>Email:</strong> info@example.com
                      </p>
                    </div>
                    <div className="col-lg-4 text-center mb-md-4 mb-4">
                      <HomeIcon sx={{ fontSize: 40 }} />
                      <p className="contact-info">
                        <strong>Address:</strong> 123 Main Street, City, Country
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
      {/* //end of integrating home section */}

      {/* // :; // } */}

      {!auth.user && (
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
      )}
    </div>
  );
}

export default Home;
