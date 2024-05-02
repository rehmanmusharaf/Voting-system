const express = require("express");
const path = require("path");
const usermodel = require("../models/usermodel");
const router = express.Router();
const ErrorHandler = require("../utils/Errorhandler.js");
// const catchasyncerr = require("../middleware/catchAsyncError.js");
var jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail.js");
const multer = require("multer");
const sendToken = require("../utils/sendToken.js");
const {
  isAuthenticated,
  isAdminAuthenticated,
} = require("../middleware/auth.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destination = cb(null, "./uploads");
    console.log("destination is : ", destination);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
// upload.single("file"),

router.post("/api/create-user", async (req, res, next) => {
  try {
    console.log("Api End Point Hit!");
    // console.log("req.file is : ", req.file);
    console.log("req.body is : ", req.body);
    const { voter_id, full_name, dob, password, constituency, uniquevoter_id } =
      req.body;
    if (
      !voter_id ||
      !full_name ||
      !dob ||
      !password ||
      !constituency ||
      !uniquevoter_id
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please Fill the Complete Form" });
    }

    const userdata = await usermodel.findOne({ voter_id });
    if (userdata !== null) {
      // console.log("User Already Exist!", userdata);
      return res
        .status(409)
        .json({ success: false, mesage: "User Already exist" });
      // return next(new ErrorHandler("User Already Exists!", 400));
    }

    const url = "null";
    const user = {
      voter_id,
      full_name,
      dob,
      password,
      constituency,
      uniquevoter_id,
    };

    const activation_token = await createactivationtoken(user);
    if (!activation_token) {
      return res
        .status(500)
        .json({ success: false, message: "Server Phasing Problems" });
    }
    const activationurl = `http://localhost:3000/activation/${activation_token}`;
    // console.log("activatoion url is ", activationurl);
    try {
      sendMail({
        email: user.voter_id,
        subject: "Activate Your Acount ",
        message: `Hello ${user.full_name} PLease Click The Link Bellow To Activate yOur Acount ${activationurl}`,
      });

      res.status(201).json({
        success: true,
        message: "Please Check Your Email To Activate Your Acount",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: error.message, error });
    }
  } catch (error) {
    // return next(new ErrorHandler(error.message, 500)); // Handle internal server error
    return res.status(500).json({
      success: false,
      mesage: error.message,
      error: error,
    });
  }
});

async function createactivationtoken(user) {
  try {
    const key = await jwt.sign(user, process.env.activationkey, {
      expiresIn: "5m",
    });

    return key;
  } catch (error) {
    return false;
  }
}
// upload.single("file"),

router.post("/api/activation", async (req, res, next) => {
  try {
    // console.log("activation end Point Hit");
    const { activation_token } = req.body;
    const newuser = jwt.verify(activation_token, process.env.activationkey);
    console.log("user is:", newuser);
    if (!newuser) {
      return next(new ErrorHandler("invalid Handler", 400));
    }

    const { voter_id, full_name, dob, password, constituency, uniquevoter_id } =
      newuser;
    const result = await new usermodel({
      voter_id,
      full_name,
      dob,
      password,
      constituency,
      uniquevoter_id,
    });
    console.log("result of user save", result);
    await result.save();
    sendToken(result, 201, res);
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message, error });
  }
});

router.post("/api/login", async (req, res) => {
  try {
    // console.log("api end point hit");
    const { email, password } = req.body;
    console.log(req.body);
    if (!email && !password) {
      return res.status(401).json({
        success: false,
        message: "Please Enter Your Credentials Before Login",
      });
    }
    let user = await usermodel.findOne({ voter_id: email }).select("+password");
    // console.log("user is :", user);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credenetials" });
    }
    // console.log("user is ", user);
    const validate = await user.comparePassword(password);
    // console.log("bcrypt comparison result : ", validate);

    if (!validate) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong ",
      error: error.message,
    });
  }
});

router.get("/getuser", isAuthenticated, async (req, res) => {
  try {
    // console.log(req.user);
    const user = await usermodel.findById(req.user.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
});

router.get("/user/logout", (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(0),
      httpOnly: true,
    });
    res
      .status(200)
      .json({ success: true, messaage: "User Logout Successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Somethinng Went Wrong ", error });
  }
});

// isAdminAuthenticated,
router.get("/getallusers", async (req, res, next) => {
  try {
    const allusers = await usermodel.find();
    const { page } = req.query || 0;
    let totalusers = 0;
    // if (page == 0) {
    totalusers = await usermodel.find({ role: "user" }).countDocuments();
    // }
    const userperpage = 5;
    const users = await usermodel
      .find({ role: "user" })
      .skip(page * userperpage)
      .limit(userperpage);
    res.status(200).json({
      success: true,
      message: `user for page ${page}`,
      totalusers,
      users,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Srever Error!" });
  }
});
router.get("/getvotedusers", isAdminAuthenticated, async (req, res, nesxt) => {
  try {
    const { page } = req.query || 0;
    const userperpage = 5;
    totalusers = await usermodel
      .find({ "vote_status.status": true, role: "user" })
      .countDocuments();
    // console.log("total user who cast vote:", totalusers);
    const users = await usermodel
      .find({ "vote_status.status": true, role: "user" })
      .skip(page * userperpage)
      .limit(userperpage);
    return res.status(200).json({
      success: true,
      message: "user who vote successfully",
      users,
      castedVotersCount: totalusers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Problem",
      error: error.message,
    });
  }
});
router.get("/getpublicvotedusers", isAuthenticated, async (req, res, nesxt) => {
  try {
    totalusers = await usermodel
      .find({ "vote_status.status": true, role: "user" })
      .countDocuments();
    return res.status(200).json({
      success: true,
      message: "user who vote successfully",
      castedVotersCount: totalusers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Problem",
      error: error.message,
    });
  }
});
module.exports = router;
