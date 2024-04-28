const mongoose = require("mongoose");
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const allowedNames = ["user", "admin"];
const electionSchema = new mongoose.Schema({
  election_name: {
    type: String,
    unique: true,
    required: true,
  },
  parties: {
    type: [String],
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
    required: true,
  },
  usertype: {
    type: String,
    enum: {
      values: allowedNames,
      message: "{VALUE} is not allowed inthis election.",
    },
  },
  electionstatus: {
    type: Boolean,
    required: true,
    default: true,
  },
});
electionSchema.pre("save", function (next) {
  if (this.startdate > this.enddate) {
    return next(
      new Error("Start date must be earlier than or equal to end date")
    );
  }
  next();
});

electionSchema.pre("save", function (next) {
  if (this.startdate >= this.enddate) {
    return next(new Error("Start date must be earlier than end date"));
  }
  next();
});
// Pre-save hook to check valid time
electionSchema.pre("save", function (next) {
  // You can add more complex logic here if needed
  //   let startingtime = this.startdate;
  //   let starttime = startingtime.split("T");
  //   let endingtime = this.endtime.split("T");
  //   let endtime = endingtime.split("T");
  const startHours = this.startdate.getHours();
  const startMinutes = this.startdate.getMinutes();
  const endHours = this.enddate.getHours();
  const endMinutes = this.enddate.getMinutes();

  const startTime = `${String(startHours).padStart(2, "0")}:${String(
    startMinutes
  ).padStart(2, "0")}`;
  const endTime = `${String(endHours).padStart(2, "0")}:${String(
    endMinutes
  ).padStart(2, "0")}`;
  if (!timeRegex.test(startTime) && !timeRegex.test(endTime)) {
    return next(new Error("Invalid time format"));
  }
  next();
});

module.exports = mongoose.model("election", electionSchema);
