const express = require("express");
const electionmodel = require("../models/electioonmodel.js");
const router = express.Router();
const { sendToken } = require("../utils/sendToken.js");
const { isAdminAuthenticated } = require("../middleware/auth.js");
router.post("/startelection", isAdminAuthenticated, async (req, res, next) => {
  try {
    const { election_name, parties, startdate, enddate } = req.body;
    if (!election_name || !parties || !startdate || !enddate) {
      return res.status(400).json({
        success: false,
        message: "Please Fill The All required Fields!",
      });
    }
    const election = await electionmodel.create({
      election_name,
      parties,
      startdate,
      enddate,
    });
    return res.status(200).json({
      success: true,
      message: `Election Successfully Creatde!`,
      election,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal Problem!",
      error: error.message,
    });
  }
});
router.get("/getelection", async (req, res, next) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    let electionname =
      req.query.electionname || `general election ${currentYear}`;
    electionname = electionname.replace(/[-]/g, " ");
    console.log(req.query.electionname);
    console.log("election name:", electionname);
    election = await electionmodel.find({ election_name: electionname });
    // console.log("Election Found is :", election);
    if (!election) {
      return res
        .status(200)
        .json({ success: false, message: "No Election Found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Election Founnd!", election });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal Problem",
      error: error.message,
    });
  }
});
// ,isAdminAuthenticated
router.get("/updatestatus", async (req, res, next) => {
  try {
    let { electionname } = req.query;
    electionname = electionname.replace(/[-]/g, " ");
    // console.log("updatestatus endpoint hit ", electionname);
    if (electionname) {
      const electiondetail = await electionmodel.find({
        election_name: electionname,
      });
      // console.log("election detail is:", electiondetail);
      // console.log("Election Detail Is:", electiondetail);
      if (electiondetail) {
        let electionenddate = new Date(electiondetail[0].enddate);
        let currentdate = new Date();
        // console.log(electionenddate, currentdate);
        if (electionenddate <= currentdate) {
          // console.log("Date COmcparison done!");
          await electionmodel.findOneAndUpdate(
            { election_name: electionname },
            { electionstatus: false },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            messgae: "Election Status Updated Successfully!",
          });
        } else {
          return res
            .status(200)
            .json({ success: false, message: "Election having days to end!" });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "Please Provide the Correct Election Name!",
        });
      }
    }
    return res
      .status(400)
      .json({ success: false, message: "User Side Prblem!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "intrenal Problem",
      error: error.message,
    });
  }
});
module.exports = router;
