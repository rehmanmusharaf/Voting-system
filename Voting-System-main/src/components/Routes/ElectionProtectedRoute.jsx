// import Spinner from "../Spinner";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { useAuth } from "../Context/Auth";
import { toast } from "react-toastify";
const ElectionProtectedRoute = () => {
  let [ok, setOk] = useState(false);
  const navigate = useNavigate();
  let [auth] = useAuth();
  let index = 0;
  let userauthenticated = false;

  async function usercheck() {
    await axios
      .get(
        `${process.env.REACT_APP_server}/getelection?electionname=general-election-2024`,
        { withCredentials: true }
      )
      .then((resp) => {
        if (resp?.data?.election[0]?.electionstatus) {
          console.log("general election bellot page res[ponse is:", resp);
          if (resp.data.success) {
            if (auth?.user) {
              setOk(true);
            } else {
              toast.error("please login to Countinue");
              Navigate("/");
            }
            // userauthenticated = true;
            // return true;

            // setOk(true);
            // console.log("Election Detail IS:", resp.data);
          } else {
            toast.error(
              auth?.user
                ? "No Election Found Till"
                : "PLease Login To countinue"
            );
            auth?.user ? navigate("/voter-login") : navigate("/");
            return false;
          }
        } else {
          toast.error("no Election Found");
          navigate("/");
          return false;
        }
      })
      .catch((error) => {
        window.location.reload();
        window.location.href = "/";
        toast.error("Something Went Wrong");
        return false;
      });
  }

  useEffect(() => {
    // if (index == 0) {
    usercheck();
    //   if (response) {
    //     const interval = setInterval(() => {
    //       index++;
    //       console.log("auth.user is:", auth?.user);
    //       if (auth?.user) {
    //         console.log("interval run but the aut.user is:", auth?.user);
    //         setOk(true);
    //         clearInterval(interval); // Stops the interval
    //       } else if (index == 5) {
    //         clearInterval(interval);
    //         toast.error("please login to countinue!");
    //         navigate("/voter-login");
    //       }
    //       // console.log("Interval is running...");
    //     }, 1000);
    //    } else {
    //     console.log("Else COndition RUn~");
    //   }
    // }

    // },5000)
  }, [auth]);

  return ok ? <Outlet /> : <Loader />;
};

export default ElectionProtectedRoute;
