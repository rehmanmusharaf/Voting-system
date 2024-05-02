import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";

function Contact() {
  return (
    <>
      <div className="container-fluid div-center">
        <h2 className="contact ">CONTACT US</h2>

        {/*----------------Contact Us Section---------------- */}
        <section className="contact-us py-3 px-4 my-4">
          <div className="container div-center">
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

        {/*----------------Map Section---------------- */}
        <section className="map py-3 px-4 my-4">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.561312327126!2d74.29645447397832!3d31.45374195043375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190145ae97af17%3A0x6d1f02b5cd2ab9f7!2sUniversity%20of%20Education!5e0!3m2!1sen!2s!4v1714588981907!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: "0" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;
