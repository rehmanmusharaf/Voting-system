const express = require("express");
const path = require("path");
const symbolmodel = require("../models/symbolmodel");
const router = express.Router();
const ErrorHandler = require("../utils/Errorhandler.js");
const multer = require("multer");
const { sendToken } = require("../utils/sendToken.js");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post(
  "/symbol/registersymbol",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const { name, code } = req.body;
      if (!name || !code || !req.file) {
        if (req.file) {
          deletefile(req?.file?.filename);
        }
        return res
          .status(400)
          .json({ success: false, message: "Please Fill All Required Fields" });
      }
      const existsymbol = await symbolmodel.findOne({
        $or: [{ code: code }, { name: name }],
      });
      if (existsymbol) {
        deletefile(req?.file?.filename);
        return res
          .status(400)
          .json({ success: false, message: "This Symbol Already Registered" });
      }
      await symbolmodel.create({
        name,
        code,
        image: { public_id: req.file.originalname, url: req.file.filename },
      });
      return res.status(200).json({
        success: true,
        message: `${name} symbol creatyed successfully`,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "internal Server error",
        error: error.message,
      });
    }
  }
);

function deletefile(filename) {
  fs.unlink(`uploads/${filename}`, (err) => {
    if (err) {
      return "Image Not Deleted!";
    }
    // console.log('File deleted successfully');
  });
  return "image Deleted Successfully;";
}

router.delete("/symbol/deletesymbol/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "symbol code not recieved!" });
    }
    const deletesymbolresult = await symbolmodel.findOneAndDelete({ _id: id });
    if (!deletesymbolresult) {
      return res
        .status(400)
        .json({ success: false, message: "no symbol exist with this code" });
    }
    deletefile(deletesymbolresult.image.url);
    return res.status(200).json({
      success: true,
      message: "Symbol deleted Successfully!",
      symbol: deletesymbolresult,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});
router.put("/symbol/updatesymbol/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code } = req.body;
    console.log("req.bod.name", req.body.name);
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Id Not recieved" });
    }
    if (!name || !code) {
      return res.status(400).json({
        success: false,
        message: "Please FIll the All Required Fields!",
      });
    }
    const updatedresult = await symbolmodel.findByIdAndUpdate(
      id,
      { name, code },
      { new: true }
    );
    if (!updatedresult) {
      return res
        .status(400)
        .json({ success: false, message: "not Any symbol Exist With this ID" });
    }
    return res.status(200).json({
      success: true,
      message: "Symbol Updated Successfullly!",
      symbol: updatedresult,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messsage: "Internal Server Error! ",
      error: error.message,
    });
  }
});

module.exports = router;
