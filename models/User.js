// Define Mongoose
const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

// Create a new instance of Mongoose schema to define shape of each document
const userSchema = new Schema({
  // Add individual properties and their associated types
  username: String,
  // { type: String, unique: true, required: true, trim: true },
  email: String,
  //  {  type: String,
  //     required: true,
  //     unique: true,
  //     match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/],
  //   },
  //   thoughts: {},
  //   friends: {},
  thoughts: [thoughtSchema],
  
});

// Compile a model based on schema
const User = model("User", userSchema);

module.exports = User;
