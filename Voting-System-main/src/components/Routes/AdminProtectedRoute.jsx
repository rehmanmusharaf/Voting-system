// import Spinner from "../Spinner";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { useAuth } from "../Context/Auth";
import { toast } from "react-toastify";
const AdminProtectedRoute = () => {
  //   const [token, setToken] = useState("");
  let [ok, setOk] = useState(false);
  const navigate = useNavigate();
  let [auth] = useAuth();

  async function usercheck() {
    await axios
      .get(`${process.env.REACT_APP_server}/getuser`, { withCredentials: true })
      .then((resp) => {
        console.log("response for amdin is:", resp);
        if (resp.data.success) {
          if (resp.data.user.role == "admin") {
            setOk(true);
          } else {
            navigate("/admin-login");
            toast.error("Please Login to Countinue");
          }
        } else {
          navigate("/admin-login");
          toast.error("Please Login to Countinue");
        }
      })
      .catch((error) => {
        console.log("error is:", error);
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

export default AdminProtectedRoute;
