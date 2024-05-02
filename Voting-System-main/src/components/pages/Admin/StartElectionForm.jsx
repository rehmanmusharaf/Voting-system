import React, { useEffect, useState } from "react";
// import "./SignUp.css";
// import { format } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
// import { useConstituency } from "./Context/constituency";
import { useSymbols } from "../../Context/Symbol";
import Loader from "../../Loader";
import Dialogueconfimation from "../../Dialogueconfimation";
import { useNavigate } from "react-router-dom";
const StartElectionForm = ({ updateelection, election }) => {
  const navigate = useNavigate();
  const [symbols] = useSymbols();
  const [electionName, setElectionName] = useState("");
  const [startElection, setStartElection] = useState("");
  const [endElection, setEndElection] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [parties, setParties] = useState([]);
  function convertUtcToPst(utcDateStr) {
    // Create a Date object from the UTC date string
    const utcDate = new Date(utcDateStr);

    // Add 5 hours to convert from UTC to PST
    const pstOffset = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
    const pstDate = new Date(utcDate.getTime() + pstOffset);

    // Return the PST date in ISO 8601 format
    return pstDate.toISOString();
  }

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
        // setElectionName("");
        // setStartElection("");
        // setEndElection("");
        // setParties([]);
        // setIsValid(true);
        window.location.href = "/success";
        // window.location.reload();
        // navigate('/success');
        toast.success("Election Created Successfully!");
      } else {
        toast.error("Check the Field you enetered is not Valid!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };
  const handleDeleteElection = async () => {
    try {
      // console.log("If Condition Run!");
      const { data } = await axios.delete(
        `${process.env.REACT_APP_server}/deleteelection?electionname=${process.env.REACT_APP_electionname}`,
        { withCredentials: true }
      );
      if (data.success) {
        window.location.reload();
        toast.success("Election Data has Been Deleted Successfully");
      } else {
        toast.error("Please Try AGain Their is Some Problems");
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Problem Please After A While");
    }
  };
  const handleupdate = async (e) => {
    try {
      console.log("Start date is:", startElection);
      console.log("end date is:", endElection);
      e.preventDefault();
      const { data } = await axios.put(
        `${process.env.REACT_APP_server}/updateelection?id=${election[0]._id}`,
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
        window.location.reload();
        toast.success("Election Updated Successfully!");
      } else {
        toast.error("Check the Field you enetered is not Valid!");
      }
    } catch (error) {
      console.log(error);
      toast.error("omething Went Wrong");
    }
  };
  useEffect(() => {
    console.log("election is", election);
    if (updateelection) {
      setElectionName(election[0].election_name);

      // let mystring1 = new Date(election[0].startdate);
      // let mystring2 = new Date(election[0].enddate);
      // // let mystring1 = election[0].startdate;
      // // let mystring2 = election[0].enddate;
      // mystring1 = mystring1.toLocaleString();
      // mystring2 = mystring2.toLocaleString();
      // mystring1 = `${mystring1.getFullYear}-${(mystring1.getMonth() + 1)
      //   .toString()
      //   .padStart(2, "0")}-${mystring1
      //   .getDate()
      //   .toString()
      //   .padStart(2, "0")}T${mystring1
      //   .getHours()
      //   .toString()
      //   .padStart(2, "0")}:${mystring1
      //   .getMinutes()
      //   .toString()
      //   .padStart(2, "0")}`;
      // console.log("strat and end date:", mystring1, mystring2);
      // setStartElection(mystring1);
      // setEndElection(mystring2);
      let mystring = convertUtcToPst(election[0].startdate);
      const indexOf = mystring.indexOf(".");
      let extractedString;
      if (indexOf !== -1) {
        extractedString = mystring.substring(0, indexOf);
        // console.log("extractde string is:", extractedString);
        setStartElection(extractedString);
      }
      let mystring2 = convertUtcToPst(election[0].enddate);
      const indexOf2 = mystring2.indexOf(".");
      let extractedString2;
      if (indexOf2 !== -1) {
        extractedString2 = mystring2.substring(0, indexOf2);
        // console.log("extractde string is:", extractedString2);
        setEndElection(extractedString2);
      }
      // setEndElection(election[0].enddate);
      let allselectedparties = election[0].parties;
      setParties([...allselectedparties]);
      // setIsValid(true);
    }
  }, []);
  return (
    <>
      <div className="content">
        <Dialogueconfimation
          title={"Do You Want To Delete Election And Detail Regarding it"}
          handleDeleteElection={handleDeleteElection}
        />
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
                        {updateelection ? (
                          <input
                            type="checkbox"
                            id="vehicle1"
                            checked={
                              updateelection
                                ? parties.includes(value.party_name)
                                  ? true
                                  : false
                                : ""
                            }
                            name="vehicle1"
                            value={value.party_name}
                            onChange={handleCheckboxChange}
                            style={{ width: "10%", marginLeft: "3px" }}
                          />
                        ) : (
                          <input
                            type="checkbox"
                            id="vehicle1"
                            name="vehicle1"
                            value={value.party_name}
                            onChange={handleCheckboxChange}
                            style={{ width: "10%", marginLeft: "3px" }}
                          />
                        )}
                      </div>
                    );
                  })}
                <br />
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
              <div
                className=" d-flex justify-content-between "
                style={{ marginRight: "20px" }}
              >
                {updateelection ? (
                  <div
                    type="button"
                    className="btn btn-success me-1 "
                    onClick={handleupdate}
                  >
                    Update Election
                  </div>
                ) : (
                  <input type="submit" value="Submit" />
                )}
                {updateelection ? (
                  <div
                    className="btn btn-danger"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={handleDeleteElection}
                  >
                    Delete Election
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default StartElectionForm;
