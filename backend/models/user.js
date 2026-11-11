const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // TODO : define the schema for a User with the following fields:
  // - name: String
  // - email: String
  // - skills: Array of Strings
});

module.exports = mongoose.model("User", userSchema);
