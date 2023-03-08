// Define Mongoose
const { Schema, model } = require("mongoose");

// Create a new instance of Mongoose schema to define shape of each document
const userSchema = new Schema(
  {
    // Add individual properties and their associated types
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Compile a model based on schema
const User = model("user", userSchema);

module.exports = User;
