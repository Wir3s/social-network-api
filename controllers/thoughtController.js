const { Thought, User } = require("../models");

module.exports = {
  // Find all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Find a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No such thought exists" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        )
      })
      .then((user) => 
      !user
        ? res
             .status(404)
             .json({ message: `Thought created but no user found with that ID`})
            : res.json(`Created the thought!`)
            )
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            })
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No thought with that ID!" })
          : 'Deleted!'
      )
      .then(() => res.json({ message: "Thought and reactions deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
};
