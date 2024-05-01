// import Spinner from "../Spinner";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { useAuth } from "../Context/Auth";
import { toast } from "react-toastify";
const ElectionProtectedRoute = () => {
  let [ok, setOk] = useState(false);
  const navigate = useNavigate();
  let [auth] = useAuth();

  async function usercheck() {
    await axios
      .get(
        `${process.env.REACT_APP_server}/getelection?electionname=general-election-2024`,
        { withCredentials: true }
      )
      .then((resp) => {
        if (resp.data.success && auth?.user) {
          setOk(true);
          console.log("Election Detail IS:", resp.data);
        } else {
          toast.error(
            auth?.user ? "No Election Found Till" : "PLease Login To countinue"
          );
          auth?.user ? navigate("/voter-login") : navigate("/");
        }
      })
      .catch((error) => {
        window.location.reload();
        window.location.href = "/";
        toast.error("Something Went Wrong");
      });
  }

  useEffect(() => {
    usercheck();
    // setTimeout(()=>{

    // },5000)
  }, []);

  return ok ? <Outlet /> : <Loader />;
};

export default ElectionProtectedRoute;
