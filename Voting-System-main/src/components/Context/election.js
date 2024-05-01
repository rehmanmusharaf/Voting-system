import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
let ElectionContext = createContext();

const Election = ({ children }) => {
  let [election, setElection] = useState([]);
  async function updateelection(election_name) {
    try {
      let { data } = await axios.get(
        `${process.env.REACT_APP_server}/updatestatus?electionname=${election_name}`,
        {
          withCredentials: true,
        }
      );

      return data.success == true;
    } catch (error) {
      console.log("Somethign went wrnong during update the election status!");
      return false;
    }
  }
  async function getelection() {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/getelection?electionname=general-election-2024`,
        { withCredentials: true }
      );
      console.log("Elections Data is :", data);
      if (data.success) {
        let result = data.election;
        let currentdate = new Date();
        // currentdate = currentdate.toISOString();
        result = result.filter((value, index) => {
          let enddate = value.enddate;
          enddate = new Date(enddate);
          console.log(currentdate, enddate);
          if (value.electionstatus) {
            let response =
              currentdate >= enddate
                ? updateelection(value.election_name)
                : true;
            console.log("response is :", response);
            return response;
          } else {
            return true;
          }
        });
        // console.log("after filtering array result is:", result);
        setElection([...result]);
      } else {
        console.log(data);
      }
    } catch (error) {
      //   setSymbols((prev) => {
      //     return { ...prev, user: false, success: false };
      //   });
      // console.log(error);
    }
  }
  useEffect(() => {
    getelection();
  }, []);
  return (
    <ElectionContext.Provider value={[election, setElection]}>
      {children}
    </ElectionContext.Provider>
  );
};

export default Election;
let useElections = () => useContext(ElectionContext);
export { useElections };
