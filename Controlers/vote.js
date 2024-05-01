const express = require("express");
const symbolmodel = require("../models/symbolmodel");
const router = express.Router();
const ErrorHandler = require("../utils/Errorhandler.js");
const { sendToken } = require("../utils/sendToken.js");
const { isAuthenticated } = require("../middleware/auth.js");
const votemodel = require("../models/votemodel.js");
const { isAdminAuthenticated } = require("../middleware/auth.js");
const usermodel = require("../models/usermodel.js");
const electionmodel = require("../models/electioonmodel.js");
// ,
router.post("/registervote", isAdminAuthenticated, async (req, res, next) => {
  try {
    // console.log("Api End point Hit!");
    const { party_name, symbolId } = req.body;
    if (!party_name || !symbolId) {
      return res.status(400).json({
        success: false,
        message: "Please Fill All The Required Fields",
      });
    }
    const vote = await votemodel.create({ party_name, symbol: symbolId });
    return res.status(200).json({ success: true, vote });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messgae: "Internal Server Error",
      error: error.message,
    });
  }
});
router.post("/api/castvote", isAuthenticated, async (req, res, nesxt) => {
  try {
    // const { electionname } = req.params;
    let electionname = req.query.electionname;
    electionname = electionname.replace(/[-]/g, " ");

    const { party_name, symbol_name } = req.body;
    console.log(party_name, symbol_name);
    // const user = await usermodel.findOne({_id:req.user._id,});
    console.log("req.user is:", req.user);
    if (req.user.vote_status.status || req.user.role == "admin") {
      return res.status(200).json({
        success: false,
        message:
          req.user.role == "admin"
            ? "You Don't have right to cast your vote"
            : "your Vote Already Casted",
      });
    }
    if (!party_name || !symbol_name) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter All Required Fields" });
    }
    const election = await electionmodel.findOne({
      election_name: electionname,
      parties: { $in: [party_name] },
    });
    if (!election) {
      return res.status(400).json({
        success: false,
        message: "Election Not Found With This Party!",
      });
    }
    console.log("election found is:", election);
    const issymbolexist = await symbolmodel.findOne({
      party_name,
    });
    if (!issymbolexist) {
      return res.status(400).json({
        success: false,
        message: "Something Went Wrong Your vote Is not Accepted",
      });
    }
    const votedparty = await votemodel.find({ party_name });
    console.log("Party to whome you are going to cast vote:", votedparty);
    const votecast = await votemodel.findOneAndUpdate(
      { party_name },
      { $inc: { vote_count: 1 } },
      { new: true }
    );
    console.log("after vote cast:", votecast);
    // console.log("issymbol exist is:", issymbolexist);
    const userupdate = await usermodel.findOneAndUpdate(
      { _id: req.user._id },
      { "vote_status.status": true, "vote_status.to": issymbolexist._id },
      { new: true }
    );
    console.log("updated user:", userupdate);
    if (!userupdate) {
      return res
        .status(400)
        .json({ success: false, message: "User Status Not " });
    }
    if (!votecast) {
      return res
        .status(400)
        .json({ success: false, message: "Something Went Wrong" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Your Vote Cast Successfully!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Problem Found Wait!",
      error: error.message,
    });
  }
});
router.get("/getvotecount", isAdminAuthenticated, async (req, res, next) => {
  try {
    const partiesvotecount = await votemodel
      .find({}, { party_name: 1, vote_count: 1 })
      .sort({ vote_count: -1 });
    // console.log(partiesvotecount);
    return res.status(200).json({
      success: true,
      message: `party with their vote count`,
      partiesvotecount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "intrenal Problem",
      error: error.message,
    });
  }
});
module.exports = router;
