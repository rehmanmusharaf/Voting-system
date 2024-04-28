import React, { useEffect, useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useConstituency } from "./Context/constituency";
function SignUp() {
  const [constituencies] = useConstituency();
  const [voterId, setVoterId] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState(null);
  const [password, setPassword] = useState("");
  const [constituency, setConstituency] = useState("");
  const [uniqueVoterId, setUniqueVoterId] = useState("");

  const clearState = () => {
    setVoterId("");
    setFullName("");
    setDob(null);
    setPassword("");
    setConstituency("");
    setUniqueVoterId("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_server}/api/create-user`,
        {
          voter_id: voterId,
          full_name: fullName,
          dob,
          password,
          constituency,
          uniquevoter_id: uniqueVoterId,
        },
        { withCredentials: true }
      );
      // console.log("data is:", data);
      if (data.success) {
        clearState();
        toast.success("Check Your gmail to Verify");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    // console.log("Constituencies array is:", constituencies);
  }, [constituencies]);
  return (
    <>
      <div className="content">
        <main>
          <div className="intro">
            <form onSubmit={handleSubmit}>
              <label for="voter-id">Voter Id:</label>
              <input
                type="email"
                id="voter-id"
                name="voter-id"
                placeholder="e.g. johndoe@gmail.com"
                value={voterId}
                required
                onChange={(e) => setVoterId(e.target.value)}
              />
              <label for="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}
              />
              <label for="birthDate">Date of Birth:</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                required
                onChange={(e) => setDob(e.target.value)}
              />
              <label for="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {constituencies.length > 0 && (
                <>
                  <label for="constituency">Constituency:</label>
                  <select
                    id="constituency"
                    name="constituency"
                    required
                    value={constituency} // The current state value is used to control the select
                    onChange={(e) => setConstituency(e.target.value)} // Event handler for when the select value changes
                    defaultValue="Select a Constituency"
                  >
                    <option value="" disabled>
                      Select a Constituency
                    </option>{" "}
                    {/* Default option */}
                    {constituencies.map((constituency, index) => (
                      <option key={index} value={constituency.constituency}>
                        {constituency.constituency} {/* Display the option */}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {/* <input
                type="text"
                id="constituency"
                name="constituency"
                required
                onChange={(e) => setConstituency(e.target.value)}
              /> */}
              <label for="uvc">Unique Voter Code:</label>
              <input
                type="text"
                id="uvc"
                name="uvc"
                required
                onChange={(e) => setUniqueVoterId(e.target.value)}
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default SignUp;
