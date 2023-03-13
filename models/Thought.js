// Define Mongoose
const { Schema, model, Types } = require("mongoose");

// Create a reaction subdocument and define the shape
const reactionSchema = new Schema(
   {
   reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
},
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  
  },
});

// Create a new instance of Mongoose schema to define shape of each document
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  username: {
    type: String,
    required: true,
  },

  reactions: [reactionSchema],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Compile a model based on schema
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
