const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: [3, "Name Must be 3 character Long"],
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("symbol", userSchema);
