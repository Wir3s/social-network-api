const Thought = require('../models/Thought');

module.exports = {

    // Find all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
           .then((dbThoughtData) => res.json(dbThoughtData))
           .catch((err) => res.status(500).json(err));
    },
}