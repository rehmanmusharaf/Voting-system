import React from "react";
import "./About.css";
import Usama from "./images/usama.jpg";
import about from "./images/about-intro.webp";
import male from "./images/maleProfile.jpg";
import subhan from "./images/subhan.jpg";
import furqan from "./images/furqan.jpg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <div className="conatiner-fluid">
        <h2 className="about">ABOUT US</h2>
        {/*----------------Introduction Section---------------- */}
        <section className="introduction row text-center py-3 px-4 my-4">
          <div className="col-lg-6 mb-md-5 my-lg-auto">
            <h1 className="fs-2 text-lg-start pb-sm-3">About Us</h1>
            <p className="text-justify">
              Welcome to Gilgit Election Voting System, pioneers in
              revolutionizing the democratic process through innovative
              technology solutions. With a steadfast commitment to advancing
              democracy and civic engagement, we are dedicated to empowering
              individuals and communities through accessible and secure online
              voting systems. Our journey began with a vision to overcome
              traditional barriers to voting and enhance participation and
              transparency in elections. Driven by the belief that democracy
              thrives when everyone has the opportunity to participate, we are
              committed to breaking down barriers to voting and creating a more
              accessible and equitable electoral system. By harnessing the power
              of technology, we aim to empower voters, strengthen trust in the
              electoral process, and build a more vibrant and participatory
              democracy for generations to come.
            </p>
          </div>
          <div className="col-lg-6 text-lg-end text-center my-auto">
            <img
              className="img-fluid w-75  rounded"
              src={about}
              alt="voting-ballot"
            />
          </div>
        </section>

        {/*----------------Team Section---------------- */}
        <section className="team-section gradient-background px-4 py-5">
          <div className="container">
            <h2 className="text-center mb-3">Our Team</h2>
            <p className="mb-5">
              "Meet our diverse and dedicated team. Experts in software
              development, design, and project management, we unite with a
              shared commitment to excellence and innovation. Together, we drive
              our mission forward with passion and purpose."
            </p>
            <div className="row">
              <div className="col-lg-4 mb-md-5 mb-5">
                <div className="card p-3">
                  <img src={subhan} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-center">Muhammad Subhan</h5>
                    <p className="card-text text-center">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <Link to="#" className="card-link">
                      <LinkedInIcon sx={{ fontSize: 50 }} />
                    </Link>
                    <Link to="#" className="card-link">
                      <GitHubIcon sx={{ fontSize: 50 }} />
                    </Link>
                    <Link to="#" className="card-link">
                      <FacebookIcon sx={{ fontSize: 50 }} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-md-5 mb-5">
                <div className="card p-3">
                  <img src={male} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-center">Muhammad Rehman</h5>
                    <p className="card-text text-center">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <Link to="#" className="card-link">
                      <LinkedInIcon sx={{ fontSize: 50 }} />
                    </Link>
                    <Link to="#" className="card-link">
                      <GitHubIcon sx={{ fontSize: 50 }} />
                    </Link>
                    <Link to="#" className="card-link">
                      <FacebookIcon sx={{ fontSize: 50 }} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card p-3">
                  <img src={furqan} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-center">Furqan Majeed</h5>
                    <p className="card-text text-center">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <Link to="#" className="card-link">
                      <LinkedInIcon sx={{ fontSize: 50 }} />
                    </Link>
                    <Link to="#" className="card-link">
                      <GitHubIcon sx={{ fontSize: 50 }} />
                    </Link>
                    <Link to="#" className="card-link">
                      <FacebookIcon sx={{ fontSize: 50 }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-4 mb-md-5 mb-5">
                <div className="card p-3">
                  <img src={male} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-center">Zohaib-ul-Hassan</h5>
                    <p className="card-text text-center">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <Link to="#" className="card-link">
                      <LinkedInIcon sx={{ fontSize: 50 }} />
                    </Link>
                    <Link to="#" className="card-link">
                      <GitHubIcon sx={{ fontSize: 50 }} />
                    </Link>
                    <Link to="#" className="card-link">
                      <FacebookIcon sx={{ fontSize: 50 }} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-md-5 mb-5">
                <div className="card p-3">
                  <img src={male} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-center">Samama Babar</h5>
                    <p className="card-text text-center">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <Link to="#" className="card-link">
                      <LinkedInIcon sx={{ fontSize: 50 }} />
                    </Link>
                    <Link to="#" className="card-link">
                      <GitHubIcon sx={{ fontSize: 50 }} />
                    </Link>
                    <Link to="#" className="card-link">
                      <FacebookIcon sx={{ fontSize: 50 }} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card p-3">
                  <img src={Usama} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-center">Usama Razzaq</h5>
                    <p className="card-text text-center">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <Link to="#" className="card-link">
                      <LinkedInIcon sx={{ fontSize: 50 }} />
                    </Link>
                    <Link to="#" className="card-link">
                      <GitHubIcon sx={{ fontSize: 50 }} />
                    </Link>
                    <Link to="#" className="card-link">
                      <FacebookIcon sx={{ fontSize: 50 }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*----------------Contact Us Section---------------- */}
        <section className="contact-us py-3 px-4 my-4">
          <div className="container">
            <div className="row">
              <div className="col-12 mb-4">
                <h2 className="section-heading text-center mb-5">Contact Us</h2>
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

        {/*----------------Mission/Vision Section---------------- */}
        <section className="mission-vision-section gradient-background px-4 py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h3 className="card-title">Mission</h3>
                    <p className="card-text text-center">
                      Our mission is to democratize the voting process by
                      providing accessible, secure, and user-friendly online
                      voting solutions. We are committed to empowering
                      individuals and communities to exercise their fundamental
                      right to vote, regardless of geographical location,
                      physical ability, or socioeconomic status. Through our
                      innovative technology platforms, we aim to increase voter
                      turnout, enhance transparency, and strengthen trust in the
                      electoral process. We believe that every voice deserves to
                      be heard, and we are dedicated to ensuring that elections
                      are fair, inclusive, and reflective of the diverse voices
                      within society.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <h3 className="card-title">Vision</h3>
                    <p className="card-text text-center">
                      Our vision at is to create a future where voting is
                      convenient, transparent, and accessible to all. We
                      envision a world where individuals can participate in
                      elections from the comfort of their own homes, using
                      secure and reliable online voting platforms. By leveraging
                      technology, we aim to overcome traditional barriers to
                      voting, such as long lines, limited polling locations, and
                      logistical challenges. We aspire to foster a culture of
                      civic engagement and active participation in the
                      democratic process, where every voter feels empowered to
                      make their voice heard. Ultimately, we envision a future
                      where online voting is the norm, and democracy flourishes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;
