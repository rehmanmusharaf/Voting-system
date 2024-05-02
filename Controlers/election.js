const express = require("express");
const electionmodel = require("../models/electioonmodel.js");
const votemodel = require("../models/votemodel.js");
const usermodel = require("../models/usermodel.js");
const router = express.Router();
const { sendToken } = require("../utils/sendToken.js");
const { isAdminAuthenticated } = require("../middleware/auth.js");
router.post("/startelection", isAdminAuthenticated, async (req, res, next) => {
  try {
    // const pstOffset = 5 * 60 * 60 * 1000;
    let { election_name, parties, startdate, enddate } = req.body;
    console.log("Election detail:", election_name, parties, startdate, enddate);
    startdate = new Date(startdate);
    // startdate = new Date(startdate.getTime());
    // console.log("pstDate is:", pstDate);
    enddate = new Date(enddate);
    // enddate = new Date(enddate.getTime() + pstOffset);

    console.log("Election detail:", election_name, parties, startdate, enddate);
    if (!election_name || !parties || !startdate || !enddate) {
      return res.status(400).json({
        success: false,
        message: "Please Fill The All required Fields!",
      });
    }

    parties.map(async (value, index) => {
      await votemodel.findOneAndUpdate(
        { party_name: value },
        { vote_count: 0 },
        { new: true }
      );
    });
    await usermodel.updateMany(
      { "vote_status.status": true },
      { $set: { "vote_status.status": false, "vote_status.to": null } },
      { new: true }
    );
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
router.delete(
  "/deleteelection",
  isAdminAuthenticated,
  async (req, res, next) => {
    try {
      console.log("delete election api end point hit!");
      let { electionname } = req.query;
      electionname = electionname.replace(/[-]/g, " ");
      if (!electionname) {
        return res.status(400).json({
          success: false,
          message: "Please Provide the Election Name",
        });
      }
      const deletedelection = await electionmodel.findOneAndDelete({
        election_name: electionname,
      });
      const usersdataupdate = await usermodel.updateMany(
        { "vote_status.status": true },
        { $set: { "vote_status.status": false, "vote_status.to": null } },
        { new: true }
      );
      const electiondataupdate = await votemodel.updateMany(
        { vote_count: { $gt: 0 } },
        { $set: { vote_count: 0 } },
        { new: true }
      );
      if (!deletedelection || !usersdataupdate || !electiondataupdate) {
        return res.status(400).json({
          success: false,
          message: deletedelection
            ? "Election Not Found"
            : "Having Problem To Delete User Data",
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "Election Deleted Successfully" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal problem",
        error: error.message,
      });
    }
  }
);
router.put("/updateelection", isAdminAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "please Enter The Election Name Correctly!",
      });
    }
    const { election_name, parties, startdate, enddate } = req.body;
    if (!election_name || !parties || !startdate || !enddate) {
      return res
        .status(200)
        .json({ success: false, message: "Please Fill All Required Fields" });
    }
    const currentdate = new Date();
    if (
      new Date(startdate) > new Date(enddate) ||
      new Date(enddate) < currentdate
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter A VAlid Date!" });
    }

    const updatedresult = await electionmodel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          election_name: election_name,
          parties: parties,
          startdate: startdate,
          enddate: enddate,
          electionstatus: true,
        },
      },
      { new: true }
    );

    if (!updatedresult) {
      return res
        .status(400)
        .json({ success: false, message: "Something Went Wrong" });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully update the Election Fields",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Problme",
      error: error.message,
    });
  }
});

module.exports = router;
