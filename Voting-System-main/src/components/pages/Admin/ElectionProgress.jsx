import React, { useEffect, useState } from "react";
import "./ElectionProgress.css";
import { toast } from "react-toastify";
import axios from "axios";
const ElectionProgress = ({ castedvoters }) => {
  const [votecount, setVotecount] = useState([]);
  const getvotecount = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/getvotecount`,
        {
          withCredentials: true,
        }
      );
      console.log("vote count response:", data);
      if (data.success) {
        setVotecount(data.partiesvotecount);
      } else {
        toast.error("Please reload your Site to Get Proper Response");
      }
    } catch (error) {
      console.log("vote ocunt error:", error);
    }
  };
  useEffect(() => {
    getvotecount();
    // console.log("casteed voters:", castedvoters);
  }, []);
  return (
    <>
      <hr />
      <div className="container div-center mt-4 ">
        <h3>Parties Progress</h3>
        <ul id="skill" className=" ">
          {votecount.length > 0 &&
            castedvoters &&
            votecount.map((value, index) => {
              return (
                <li>
                  <span
                    class="bar graphic-design"
                    style={{
                      width: `${
                        (value.vote_count / castedvoters.length) * 100
                      }%`,
                    }}
                  ></span>
                  <h4 className=" position-relative" style={{ top: "-30px" }}>
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
