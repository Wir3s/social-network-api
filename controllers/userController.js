const { User, Thought } = require("../models");

module.exports = {
  // Find all users THIS WORKS
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Find all users TESTING WTIH ASYNC
  // getUsers(req, res) {
  //     User.find()
  //     .then(async (users) => {
  //         const userObj = {
  //             users,
  //         };
  //         return res.json(userObj);
  //     })
  //     .catch((err) => {
  //         console.log(err);
  //         return res.status(500).json(err);
  //     });
  // },

  // Find one user - THIS WORKS
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : res.json({user})
      )
      .catch((err) => res.status(500).json(err));
  },


  // Find one user, with Async
  // getSingleUser(req, res) {
  //   User.findOne({ _id: req.params.userId })
  //   .select("-__v")
  //   .then(async (user) =>
  //    !user
  //      ? res.status(404).json({ message: 'No user found with that ID' })
  //      :res.json({
  //       user,
  //       // thoughts,
  //      })
  //   )
  //   .catch((err) => {
  //     console.log(err);
  //     return res.status(500).json(err);
  //   });
  // },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // add a friend to a user
  addFriend(req, res) {
    User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
      },

        // Delete a friend from a user
  deleteFriend(req, res) {
    User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
      },


  // delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID!" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User and thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
