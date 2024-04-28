const express = require("express");
const symbolmodel = require("../models/symbolmodel");
const router = express.Router();
const ErrorHandler = require("../utils/Errorhandler.js");
const { sendToken } = require("../utils/sendToken.js");
const { isAuthenticated } = require("../middleware/auth.js");
const votemodel = require("../models/votemodel.js");
const { isAdminAuthenticated } = require("../middleware/auth.js");
const usermodel = require("../models/usermodel.js");
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
    const { party_name, symbol_name } = req.body;
    // const user = await usermodel.findOne({_id:req.user._id,});
    if (req.user.vote_status.status) {
      return res
        .status(200)
        .json({ success: false, message: "your Vote Already Casted" });
    }
    if (!party_name || !symbol_name) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter All Required Fields" });
    }
    // symbolmodel.findOne;
    const issymbolexist = await symbolmodel.findOneAndUpdate({
      party_name,
      symbol_name,
    });
    if (!issymbolexist) {
      return res.status(400).json({
        success: false,
        message: "Something Wnet Wrong Your vote Is not Accepted",
      });
    }
    const votecast = await votemodel.findOneAndUpdate(
      { party_name },
      { $inc: { vote_count: 1 } },
      { new: true }
    );
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
      mmessage: "Internal Problem Found Wait!",
      error: error.messahe,
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
