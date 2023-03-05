// Define Mongoose
const mongoose = require("mongoose");

// Create a new instance of Mongoose schema to define shape of each document
const userSchema = new mongoose.Schema({
  // Add individual properties and their associated types
  username: { type: String, unique: true, required: true, trim: true },
  email: {
    type: String,
//     required: true,
//     unique: true,
//     match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/],
//   },
//   thoughts: {},
//   friends: {},
  }
});

// Compile a model based on schema
const User = mongoose.model("User", userSchema);

// Error handler function, for errors when saving
const handleError = (err) => console.error(err);

module.exports = User;
