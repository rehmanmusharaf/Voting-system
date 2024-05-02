import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
function Footer() {
  return (
    <>
      <section className="footer">
        <div className="container pt-5 pb-3">
          <div className="row">
            <div className="col-xs-12 col-lg-4 col-md-4">
              <h2 className="text-start">GEVS</h2>
              <p className="text-start">
                We believe that every voice matters, and we're here to empower
                you to make a difference. With our secure and user-friendly
                online voting platform, you can participate in elections from
                anywhere, at any time.
              </p>
            </div>
            <div className="col-xs-12 col-lg-4 col-md-4">
              <h2 className="text-start">Quick Links</h2>
              <ul className="text-start">
                <li>
                  <Link className="light-shade" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="light-shade" to="/about">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="light-shade" to="/contact">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="light-shade" to="/voter-signup">
                    Register
                  </Link>
                </li>
                <li>
                  <Link className="light-shade" to="/voter-login">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-xs-12 col-lg-4 col-md-4">
              <h2 className="text-start">Developers</h2>
              <ul className="text-start">
                <li>Muhammad Rehman</li>
                <li>Usama Razzaq</li>
                <li>Muhammad Subhan</li>
                <li>Furqan Majeed</li>
                <li>Zohaib-ul-Hassan</li>
                <li>Samama Babar</li>
              </ul>
            </div>
          </div>
          <div className="row footnote py-2">
            <p>An Online Voting System created for semester project.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Footer;
