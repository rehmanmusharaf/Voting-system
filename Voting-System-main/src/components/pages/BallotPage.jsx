import React, { useState } from "react";
import "./BallotPage.css"; // Import your CSS file for styling
import { useSymbols } from "../Context/Symbol";
import axios from "axios";
import { toast } from "react-toastify";
import { useElections } from "../Context/election";
const BallotPage = () => {
  let [symbols] = useSymbols();
  let [election] = useElections();
  // let [parties, setParties] = useState(election);
  console.log("election Parties are:", election);
  const [selectedparty, setSelectedparty] = useState(null);

  const handleSubmitBallot = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_server}/api/castvote?electionname=${process.env.REACT_APP_electionname}`,
        selectedparty,
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success("Vote Cast Successfully");
        return;
      } else if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.error("Something Went Wrong");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    // ballot-container
    <div className=" container">
      <div className="vote-option-container flex-column rounded ">
        <h2>Online Ballot</h2>
        <p>Please select exactly one candidate from your constituency:</p>
        <div class="widget-wrap">
          <h1>SIMPLE JS QUIZ</h1>
          <div id="quizWrap">
            <div id="quizQn">Quize Question Comes here</div>
            <form>
              <div id="quizAns" className="hAns">
                {symbols &&
                  election &&
                  symbols.map(
                    (value, index) => {
                      return (
                        <>
                          {election[0]?.parties?.includes(value.party_name) ? (
                            <>
                              <input
                                type="radio"
                                name="quiz"
                                id="quizo"
                                value={value.party_name}
                              />
                              <label
                                htmlFor="quizo"
                                onClick={() =>
                                  setSelectedparty({
                                    party_name: value.party_name,
                                    symbol_name: value.symbol_name,
                                  })
                                }
                                className={`${
                                  selectedparty?.party_name == value.party_name
                                    ? "border-dark"
                                    : ""
                                } `}
                              >
                                {value.party_name}
                              </label>
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    }
                    // </>,
                    // ]
                  )}
              </div>
              <button
                onClick={handleSubmitBallot}
                disabled={!selectedparty}
                style={{ margin: "0px auto" }}
                className=" mt-2 button z-1]"
              >
                Submit Ballot
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="constituency-list">
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
      </div> */}
    </div>
  );
};

export default BallotPage;
