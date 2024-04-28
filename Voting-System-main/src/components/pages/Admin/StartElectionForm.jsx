import React, { useEffect, useState } from "react";
// import "./SignUp.css";
import axios from "axios";
import { toast } from "react-toastify";
// import { useConstituency } from "./Context/constituency";
import { useSymbols } from "../../Context/Symbol";
const StartElectionForm = () => {
  const [symbols] = useSymbols();
  const [electionName, setElectionName] = useState("");
  const [startElection, setStartElection] = useState("");
  const [endElection, setEndElection] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [parties, setParties] = useState([]);
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      // If the checkbox is checked, add the value to the array using array.push
      setParties((prevValues) => [...prevValues, value]);
    } else {
      // If the checkbox is unchecked, remove the value from the array
      setParties((prevValues) => prevValues.filter((item) => item !== value));
    }
    console.log(parties);
  };

  // Check if start time is earlier than end time
  const validateTimes = (start, end) => {
    if (start && end) {
      if (new Date(start) >= new Date(end)) {
        toast.error("Start Election Must Before End Election");
        console.log("start election datee isgreater then end election!");
        setStartElection("");
        return false;
      }
    }
    return true;
  };

  const handleStartChange = (e) => {
    const datenow = new Date();
    // Extract year, month, day, hours, and minutes
    const year = datenow.getFullYear(); // 2024
    const month = (datenow.getMonth() + 1).toString().padStart(2, "0"); // 05 (months are 0-indexed)
    const day = datenow.getDate().toString().padStart(2, "0"); // 03
    const hours = datenow.getHours().toString().padStart(2, "0"); // 09
    const minutes = datenow.getMinutes().toString().padStart(2, "0"); // 08

    // Create the formatted date-time string
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    console.log(formattedDateTime);
    const value = e.target.value;
    if (formattedDateTime <= value) {
      setStartElection(value);
      console.log(value);
      // Validate times
      setIsValid(validateTimes(value, endElection));
    } else {
      toast.error("Start Date Must not Before Now");
    }
  };

  const handleEndChange = (e) => {
    const value = e.target.value;
    setEndElection(value);
    console.log(value);
    // Validate times

    setIsValid(validateTimes(startElection, value));
  };
  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(startElection, parties, endElection, electionName);
      const { data } = await axios.post(
        `${process.env.REACT_APP_server}/startelection`,
        {
          election_name: electionName,
          parties,
          startdate: startElection,
          enddate: endElection,
        },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success("Election Created Successfully!");
        setElectionName("");
        setStartElection("");
        setEndElection("");
        setParties([]);
        setIsValid(true);
      } else {
        toast.error("Check the Field you enetered is not Valid!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };
  return (
    <>
      <div className="content">
        <main>
          <div className="intro">
            <form onSubmit={handlesubmit}>
              <label for="voter-id">Election Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={electionName}
                placeholder="eg. General Election 2023"
                required
                onChange={(e) => setElectionName(e.target.value)}
              />
              <label>Select Parties For Election:</label>
              <div className="d-flex  align-items-center ">
                {symbols.length > 0 &&
                  symbols.map((value, index) => {
                    return (
                      <div className="w-50 d-flex">
                        <label htmlFor="vehicle1">{value.party_name}</label>
                        <input
                          type="checkbox"
                          id="vehicle1"
                          name="vehicle1"
                          value={value.party_name}
                          onChange={handleCheckboxChange}
                          style={{ width: "10%", marginLeft: "3px" }}
                        />
                      </div>
                    );
                  })}
                {/* <br /> */}
              </div>

              <label for="startelectiondate">Election Start date</label>
              <input
                type="datetime-local"
                id="startelectiondate"
                name="startelectiondate"
                value={startElection}
                required
                onChange={handleStartChange}
              />
              <label for="endelectiondate">Election End date</label>
              <input
                type="datetime-local"
                id="endelectiondate"
                name="endelectiondate"
                value={endElection}
                required
                onChange={handleEndChange}
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default StartElectionForm;
