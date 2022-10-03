const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Create a data schema for users in MongoDB
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Check if the email has not already been used
userSchema.plugin(uniqueValidator);

// Create a model from the schema
module.exports = mongoose.model("User", userSchema);