import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

let ConstituencyContext = createContext();

const Constituency = ({ children }) => {
  let [constituencies, setConstituencies] = useState([]);
  async function getconstituecies() {
    // console.log("Constituency get FUnction run");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/api/getconstituency`
      );
      //   console.log("constituency data:", data);
      if (data.success) {
        // console.log("Constituency detail is :", data);
        let result = data.constituencies;
        // console.log("result of COntitiuenci is:", result);
        setConstituencies([...result]);
      } else {
        // console.log(data);
      }
    } catch (error) {
      console.log("Constituency not Found error:", error);
    }
  }
  useEffect(() => {
    getconstituecies();
  }, []);
  return (
    <ConstituencyContext.Provider value={[constituencies, setConstituencies]}>
      {children}
    </ConstituencyContext.Provider>
  );
};

export default Constituency;
let useConstituency = () => useContext(ConstituencyContext);

export { useConstituency };
