const mongoose = require("mongoose");
const voterschema = new mongoose.Schema({
  party_name: {
    type: String,
    unique: true,
    required: true,
    minlength: [3, "Please Enter The Party Name"],
  },
  symbol: {
    type: mongoose.ObjectId,
    unique: true,
    required: [true, "Please Enter Your Election Symbol"],
  },
  vote_count: {
    type: Number,
    default: 0,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("votes", voterschema);
