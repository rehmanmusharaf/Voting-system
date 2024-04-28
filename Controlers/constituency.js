const express = require("express");
const constituencymodel = require("../models/constituency.js");
const router = express.Router();
const { sendToken } = require("../utils/sendToken.js");
const { isAdminAuthenticated } = require("../middleware/auth.js");
router.post(
  "/api/registerconstituency",
  isAdminAuthenticated,
  async (req, res, next) => {
    try {
      const { constituency, code } = req.body;
      if (!constituency || !code) {
        return res.status(400).json({
          successs: false,
          message: "Please Filll All The Required Fields",
        });
      }
      await constituencymodel.create({
        constituency,
        code,
      });
      return res
        .status(200)
        .json({ success: true, message: "Constituency Created" });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "internal Server Error",
        error: error.message,
      });
    }
  }
);
router.get("/api/getconstituency", async (req, res) => {
  try {
    // console.log("Constiuency Endpoin hit");
    const constituencies = await constituencymodel.find();
    return res.status(200).json({
      success: true,
      message: "constituencies Successfully get",
      constituencies,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Problem Try After A While!" });
  }
});
module.exports = router;
