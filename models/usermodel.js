const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  voter_id: {
    type: String,
    unique: true,
    required: [true, "Please enter your voter ID!"],
  },
  full_name: {
    type: String,
    required: [true, "Please enter your Full Name!"],
  },
  dob: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  constituency: {
    type: String,
    required: true,
  },
  uniquevoter_id: {
    type: String,
    reqiured: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    default: "user",
  },
  vote_status: {
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    to: {
      type: mongoose.ObjectId,
    },
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//  Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = async function () {
  try {
    console.log("JWT TOKEN GEnerate Function Run ! ");
    // console.log("id is ", JSON.parse(this._id));

    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY);
    console.log("User Token Genrated : ", token);
    return token;
  } catch (error) {
    console.log("Something Went WRong Durong Token Generation ! ");
    console.log(error);
  }
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  // console.log("COmparison Function run ", this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
