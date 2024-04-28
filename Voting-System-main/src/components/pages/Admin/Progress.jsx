import React, { useEffect, useState } from "react";
import "./Progress.css";
import { useSymbols } from "../../Context/Symbol";
const Progress = ({ voters, castedvoterslength }) => {
  let [symbols] = useSymbols();
  useEffect(() => {}, []);
  return (
    <div className="container div-center mt-1 ">
      <h3 className="">Election Statistics</h3>
      <div className="row justify-content-center ">
        <div className="col-md-3 col-sm-6">
          <div
            style={{
              height: "150px",
              width: "150px",
              position: "relative",
            }}
            className=" overflow-hidden progress-bar-container rounded-circle div-center"
          >
            <div
              className=" d-flex justify-content-center align-items-center progress-bar"
              style={{
                height: "150px",
                width: "100%",
                backgroundColor: "#96db79",
              }}
            ></div>
            <div
              className="div-center rounded-circle d-flex justify-content-center align-items-center"
              style={{
                height: "120px",
                width: "120px",
                backgroundColor: "#44484b",
                top: "10%",
                color: "white",
                fontSize: "30px",
              }}
            >
              {symbols && symbols.length}
            </div>
          </div>
          <h6 className=" text-center ">Number Of parties Registred</h6>
        </div>
        <div className="col-m d-3 col-sm-6">
          <div
            style={{
              height: "150px",
              width: "150px",
              position: "relative",
            }}
            className=" overflow-hidden progress-bar-container rounded-circle div-center"
          >
            <div
              className=" d-flex justify-content-center align-items-center progress-bar"
              style={{
                height: "150px",
                width: "100%",
                backgroundColor: "#96db79",
              }}
            ></div>
            <div
              className="div-center rounded-circle d-flex justify-content-center align-items-center"
              style={{
                height: "120px",
                width: "120px",
                backgroundColor: "#44484b",
                top: "10%",
                color: "white",
                fontSize: "30px",
              }}
            >
              {voters}
            </div>
          </div>
          <h6 className=" text-center ">Number Of Voters Registered</h6>
        </div>
        <div className="col-md-3 col-sm-6">
          <div
            style={{
              height: "150px",
              width: "150px",
              position: "relative",
            }}
            className=" overflow-hidden progress-bar-container rounded-circle div-center"
          >
            <div
              className=" d-flex justify-content-center align-items-center progress-bar"
              style={{
                height: "150px",
                width: `${(castedvoterslength / voters) * 100}%`,
                backgroundColor: "#fdba04",
              }}
            ></div>
            <div
              className="div-center rounded-circle d-flex justify-content-center align-items-center"
              style={{
                height: "120px",
                width: "120px",
                backgroundColor: "#44484b",
                top: "10%",
                color: "white",
                fontSize: "30px",
              }}
            >
              {castedvoterslength}
            </div>
          </div>
          <h6 className=" text-center ">Vote Cast till now</h6>
        </div>
      </div>
    </div>
  );
};

export default Progress;
