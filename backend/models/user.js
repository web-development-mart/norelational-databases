const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: {
    city: String,
    country: String,
  },
  skills: [String],
});

module.exports = mongoose.model("User", userSchema);
