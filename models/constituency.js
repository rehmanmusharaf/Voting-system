const mongoose = require("mongoose");
const constituencySchema = new mongoose.Schema({
  constituency: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("constituency", constituencySchema);
