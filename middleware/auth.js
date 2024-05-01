const usermodel = require("../models/usermodel");
const ErrorHandler = require("../utils/Errorhandler");
// const catchAsyncError = require("./catchAsyncError");
const jsonwebtoken = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    // console.log("isAuthenticayed Function Run!");
    // console.log(req.cookies);
    const { token } = req.cookies;
    // console.log("token is:", tokaen);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Please login to countinue" });
    }
    const decoded = await jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET_KEY
    );
    req.user = await usermodel.findById(decoded?.id);
    // if (req?.user?.role !== "user") {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "You Don't have User Credentials" });
    // } else {
    next();
    // }
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ success: false, message: error.message, error });
  }
};
exports.isAdminAuthenticated = async (req, res, next) => {
  try {
    // console.log("isAuthenticayed Function Run!");
    // console.log(req.cookies);
    const { token } = req.cookies;
    // console.log("token is:", token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Please login to countinue" });
    }
    const decoded = await jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET_KEY
    );
    // consokle.log("decoding is:", decoded);
    // req.
    user = await usermodel.findById(decoded.id);
    // console.log("user is:", user);
    if (user?.role == "admin") {
      req.user = user;
    } else {
      return res
        .status(400)
        .json({ success: false, message: "You Don't have Admin Right!" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message, error });
  }
};
