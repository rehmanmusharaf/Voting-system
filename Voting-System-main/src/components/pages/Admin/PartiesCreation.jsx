// import React from "react";
import React, { useState } from "react";
import "./PartiesCreation.css";
import { toast } from "react-toastify";
import axios from "axios";
import List from "./List";
import { useSymbols } from "../../Context/Symbol";
function PartiesSelection() {
  const [symbols, setSymbols] = useSymbols();
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [party_name, setParty_name] = useState(null);
  const [code, setCode] = useState(null);
  const [chairman, setChairman] = useState(null);
  const [symbol, setSymbol] = useState(null);
  const [loading, setLoading] = useState(false);
  const formData = new FormData();
  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
  };
  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      formData.append("party_name", party_name);
      formData.append("code", code);
      formData.append("chairman", chairman);
      formData.append("symbol_name", symbol);
      formData.append("files", file1);
      formData.append("files", file2);
      console.log("Form Data before Submiting:", formData);
      const config = {
        headers: {
          enctype: "multipart/form-data",
          "Content-Type": "multipart/form-data", // This is the correct header for form data
        },
        withCredentials: true, // If you need to send cookies or use authentication
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_server}/symbol/registersymbol`,
        formData,
        config
      );
      if (data.success) {
        toast.success("Symbol Created Successfully!");
        setFile1(null);
        setFile2(null);
        setParty_name("");
        setCode(0);
        setChairman("");
        setSymbol("");
        setSymbols((prev) => {
          return [...prev, data.party];
        });
        // setSymbols
        setLoading(false);
        return;
      } else {
        toast.error("SOmething Went Wrong Please Try After A Minute");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Internal Problem Try After a few minutes");
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <section className="add-party">
        <div class="party-form">
          <form onSubmit={handlesubmit}>
            <label for="party-name">Party Name</label>
            <input
              type="text"
              id="party-name"
              placeholder="Atleast three characters"
              value={party_name}
              onChange={(e) => setParty_name(e.target.value)}
              required
            />
            <label for="party-symbol">Party Symbol</label>
            <input
              type="text"
              id="party-symbol"
              placeholder="Bat, Lion, etc."
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
            />
            <label for="chairman">Enter the Chairman Name</label>
            <input
              type="string"
              id="chairman"
              placeholder="Imran Khan etc."
              value={chairman}
              onChange={(e) => setChairman(e.target.value)}
              required
            />
            <label for="chairman">Enter the Unique Code</label>
            <input
              type="Number"
              id="chairman"
              placeholder="11111 etc."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <div>
              <label htmlFor="file1">upload Cover Picture</label>
              <input type="file" id="file1" onChange={handleFile1Change} />
            </div>
            <div>
              <label htmlFor="file2">upload Symbol Picture</label>
              <input type="file" id="file2" onChange={handleFile2Change} />
            </div>
            {loading ? (
              <button class="btn btn-primary" type="button" disabled>
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ) : (
              <input type="submit" />
            )}
          </form>
        </div>
      </section>
      <List />
    </>
  );
}

export default PartiesSelection;
