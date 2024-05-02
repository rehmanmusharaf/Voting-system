import React, { useState, useEffect } from "react";
import "./AdminDashboard.css"; // Import your CSS file for styling
import Progress from "./Admin/Progress";
import { useSymbols } from "../Context/Symbol";
import ElectionProgress from "./Admin/ElectionProgress";
import axios from "axios";
import StartElectionForm from "./Admin/StartElectionForm";
import { useElections } from "../Context/election";
import PartiesCreation from "./Admin/PartiesCreation.jsx";
const AdminDashboard = () => {
  let [election] = useElections();
  const [symbols] = useSymbols();
  const [voters, setVoters] = useState();
  const [castedvoters, setCastedvoters] = useState();
  const [castedvoterscount, setCastedvoterscount] = useState();
  // State variables to manage election status, candidates, parties, etc.
  const [electionStatus, setElectionStatus] = useState("Not Started");
  const [candidates, setCandidates] = useState([]);
  const [parties, setParties] = useState([]);
  const [realTimeResults, setRealTimeResults] = useState({});
  const [rigisterparties, setRegisterparties] = useState(symbols);

  // Function to start the election
  const startElection = () => {
    setElectionStatus("Started");
    // Additional logic to start the election
  };

  // Function to end the election
  const endElection = () => {
    setElectionStatus("Ended");
    // Additional logic to end the election
  };

  // Function to add a candidate
  const addCandidate = (candidate) => {
    // Logic to add a candidate
  };

  // Function to remove a candidate
  const removeCandidate = (candidateId) => {
    // Logic to remove a candidate
  };

  // Function to add a party
  const addParty = (party) => {
    // Logic to add a party
  };

  // Function to remove a party
  const removeParty = (partyId) => {
    // Logic to remove a party
  };

  // Function to announce the winner
  const announceWinner = () => {
    // Logic to determine and announce the winner
  };
  const getvoters = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/getallusers`,
        {
          withCredentials: true,
        }
      );
      setVoters(data.users);
    } catch (error) {
      // console.log("during voters get error:",error)
    }
  };
  const getvotecasted = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/getvotedusers`,
        {
          withCredentials: true,
        }
      );
      console.log("voted users data", data.users);
      setCastedvoters(data.users);
      // console.log("data of casted voters:", data);
      let count = data.castedVotersCount;
      // console.log("count is:", count);
      setCastedvoterscount(count);
    } catch (error) {
      // console.log("during voters get error:",error)
    }
  };
  // Fetch real-time results from server on component mount
  useEffect(() => {
    getvoters();
    getvotecasted();
    console.log("election is:", election);
    // Logic to fetch real-time results
  }, []);

  return (
    <>
      <Progress
        voters={voters && voters.length}
        castedvoterslength={castedvoterscount && castedvoterscount}
      />
      <hr />
      <div className="container div-center">
        <h2 className="text-start">Start Election/Modify Election</h2>
      </div>
      {election && election.length > 0 ? (
        <StartElectionForm updateelection={true} election={election} />
      ) : (
        <StartElectionForm updateelection={false} />
      )}
      {castedvoterscount >= 0 && (
        <ElectionProgress castedvoterslength={castedvoterscount} admin={true} />
      )}
      <hr />
      <div className="container div-center">
        <h2 className=" text-start ">Register Symbol</h2>
      </div>
      <PartiesCreation />

      <div className="admin-dashboard">
        <h1>Election Commission Dashboard</h1>
        <div className="status">
          <p>Election Status: {electionStatus}</p>
          <div className="btn-container">
            <button
              onClick={startElection}
              disabled={electionStatus !== "Not Started"}
            >
              Start Election
            </button>
            <button
              onClick={endElection}
              disabled={electionStatus !== "Started"}
            >
              End Election
            </button>
          </div>
        </div>
        <div className="real-time-results">
          <h2>Real-Time Election Results</h2>
          <ul>
            <li>Gilgit-Town: 1000 votes</li>
            <li>Northern-Mountain: 800 votes</li>
            <li>Western-Gilgit: 1200 votes</li>
            <li>Narum-Valley: 600 votes</li>
          </ul>
        </div>
        <div className="candidates">
          <h2>Candidates</h2>
          <ul>
            <li>John Doe</li>
            <li>Jane Smith</li>
            <li>Mohammad Khan</li>
            <li>Alice Johnson</li>
          </ul>
        </div>
        <div className="parties">
          <h2>Parties</h2>
          <ul>
            <li>Blue Party</li>
            <li>Red Party</li>
            <li>Yellow Party</li>
            <li>Independent</li>
          </ul>
        </div>
        <button onClick={announceWinner} disabled={electionStatus !== "Ended"}>
          Announce Winner
        </button>
      </div>
    </>
  );
};

export default AdminDashboard;
