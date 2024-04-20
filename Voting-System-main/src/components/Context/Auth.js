import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
let AuthContext = createContext();

const Auth = ({ children }) => {
  let [auth, setAuth] = useState({ user: null, success: null });
  async function getuser() {
    // console.log("Context Hook Function RUn!");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/getuser`,
        { withCredentials: true }
      );
      if (data.success) {
        // console.log("user detail is :", data);
        setAuth((prev) => {
          return { ...prev, user: data.user, success: true };
        });
      } else {
        console.log(data);
      }
    } catch (error) {
      setAuth((prev) => {
        return { ...prev, user: false, success: false };
      });
      //   console.log(error);
    }
  }
  useEffect(() => {
    getuser();
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
let useAuth = () => useContext(AuthContext);

export { useAuth };
