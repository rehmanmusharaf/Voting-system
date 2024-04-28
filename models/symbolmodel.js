const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  party_name: {
    type: String,
    unique: true,
    required: true,
    minlength: [3, "Name Must be 3 character Long"],
  },
  symbol_name: {
    type: String,
    required: [true, "Please Enter Your Election Symbol"],
    unique: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  chairman: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("symbol", userSchema);
