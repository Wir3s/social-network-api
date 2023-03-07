// Define Mongoose
const mongoose = require("mongoose");

// Create a reaction subdocument and define the shape
const reactionSchema = new mongoose.Schema({
    // reactionId
    reactionBody: { 
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        // default
    }
})

// Create a new instance of Mongoose schema to define shape of each document
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    // default
  },
  username: {
    type: String,
    required: true,
  },
  reaction: reactionSchema,
});

// Compile a model based on schema
const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
