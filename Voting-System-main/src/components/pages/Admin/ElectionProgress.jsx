import React, { useEffect, useState } from "react";
import "./ElectionProgress.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useElections } from "../../Context/election";
const ElectionProgress = ({ castedvoterslength, admin }) => {
  const [election] = useElections();
  const [votecount, setVotecount] = useState([]);
  const getvotecount = async () => {
    try {
      if (election) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_server}/${
            admin
              ? "getvotecount"
              : `getpublicvotecount?electionname=${election[0].election_name}`
          }`,
          {
            withCredentials: true,
          }
        );
        // console.log("vote count response:", data);
        if (data.success) {
          setVotecount(data.partiesvotecount);
          console.log(
            "casteed voters:",
            castedvoterslength,
            "votecount :",
            data.partiesvotecount
          );
        } else {
          toast.error("Please reload your Site to Get Proper Response");
        }
      }
    } catch (error) {
      console.log("vote ocunt error:", error);
    }
  };
  useEffect(() => {
    getvotecount();
  }, []);
  return (
    <>
      <hr />
      <div className="container mt-4" style={{ background: "none" }}>
        <h3>Parties Progress</h3>
        <ul id="skill" className=" ">
          {votecount.length > 0 &&
            castedvoterslength >= 0 &&
            votecount.map((value, index) => {
              return (
                <li>
                  <span
                    class="bar graphic-design text-center fs-5 start-0 end-0 m-0 "
                    style={{
                      width: `${
                        castedvoterslength == 0
                          ? 0
                          : (value.vote_count / castedvoterslength) * 100
                      }%`,
                    }}
                  >
                    {castedvoterslength == 0
                      ? 0
                      : Math.floor(
                          (value.vote_count / castedvoterslength) * 100
                        )}
                    %
                  </span>
                  <h4
                    className=" position-relative text-start"
                    style={{ top: "-30px" }}
                  >
                    {value.party_name}
                  </h4>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default ElectionProgress;
