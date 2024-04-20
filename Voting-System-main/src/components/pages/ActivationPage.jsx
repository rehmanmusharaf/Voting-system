import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Activationpage = () => {
  const { activation_token } = useParams();
  const currentUrl = window.location.href;
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  let count = 0;
  const [redirect, setRedirect] = useState(false);
  function usercheck() {
    if (activation_token && count === 0) {
      try {
        count = 1;
        axios
          .post(
            `${process.env.REACT_APP_server}/api/activation`,
            { activation_token },
            { withCredentials: true }
          )
          .then((resp) => {
            console.log(resp);
            if (resp.data.success) {
              setError(true);
            }
          })
          .catch((error) => {
            toast.error("Invalid Token || Token Expire");
            setError(false);
            console.log("Thier is an Eroor", error);
          });
      } catch (error) {
        toast.error("Invalid Token || Token Expire");
        setError(false);
        // console.log(error);
      }
    }
  }

  useEffect(() => {
    if (activation_token) {
      usercheck();
    }
  }, []);
  if (error) {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <>
      {error !== null && (
        <div>
          {error ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "90vh" }}
            >
              <div className="text-center">
                <h1 className="mb-4">Your Account is Successfully Activated</h1>
                <p>Redirecting you to home page...</p>
              </div>
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ height: "90vh" }}
            >
              <div className="text-center">
                <h1 className="mb-4">Token Expired</h1>
                <p>Please Register Again</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Activationpage;
