import React, { useState } from "react";
import "./voter-log.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/Auth";
function VoterLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const naviagte = useNavigate();
  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_server}/api/login`,
        { email, password },
        { withCredentials: true }
      );
      if (data) {
        console.log("after Login Voter Data", data);
        if (data.success) {
          setAuth((prev) => {
            return { ...prev, success: true, user: data.user };
          });
          toast.success("Login Successfully!");
          naviagte("/");
        } else if (data.success) {
          toast.error(data.message);
        }
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  }
  return (
    <>
      <div class="content">
        <main>
          <div class="intro">
            <form onSubmit={handlesubmit}>
              <label for="voter-id">Email Id:</label>
              <input
                type="email"
                id="voter-id"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="submit" />
              <div class="reg">
                <h3>
                  Create New Account <a href="sign-up.html">Sign Up</a>
                </h3>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default VoterLogin;
