const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // TODO : define the schema for a User with the following fields:
  // - name: String (required)
  // - email: String (required)
  // - skills: Array of Strings
  // - address: { city: String, country: String }
  // - avatar: String
});

module.exports = mongoose.model("User", userSchema);
