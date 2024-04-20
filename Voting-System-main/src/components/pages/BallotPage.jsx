import React, { useState } from "react";
import "./BallotPage.css"; // Import your CSS file for styling

const BallotPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const constituencyList = [
    "Gilgit-Town",
    "Northern-Mountain",
    "Western-Gilgit",
    "Narum-Valley",
  ];
  const candidateList = [
    "Candidate A",
    "Candidate B",
    "Candidate C",
    "Candidate D",
  ]; // Your selected candidate names

  const handleCandidateSelection = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleSubmitBallot = () => {
    // Code to submit the ballot
    // You can send the selectedCandidate to the backend to record the vote
    console.log("Ballot submitted for candidate:", selectedCandidate);
    // You can also disable the form or show a message indicating that the vote has been cast
  };

  return (
    <div className="ballot-container">
      <h2>Online Ballot</h2>
      <p>Please select exactly one candidate from your constituency:</p>
      <div className="constituency-list">
        {constituencyList.map((constituency, index) => (
          <div key={index} className="constituency-item">
            <h3>{constituency}</h3>
            <div className="candidate-list">
              {candidateList.map((candidate, index) => (
                <div key={index} className="candidate-item">
                  <input
                    type="radio"
                    id={`${constituency}-${candidate}`}
                    name={`${constituency}-candidate`}
                    value={candidate}
                    onChange={() => handleCandidateSelection(candidate)}
                  />
                  <label htmlFor={`${constituency}-${candidate}`}>
                    {candidate}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmitBallot} disabled={!selectedCandidate}>
        Submit Ballot
      </button>
    </div>
  );
};

export default BallotPage;
