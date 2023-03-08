const User = require('../models/User');

module.exports = {

    // Find all users THIS WORKS
    // getUsers(req, res) {
    //     User.find()
    //     .then((users) => res.json(users))
    //     .catch((err) => res.status(500).json(err));
    // },

    // Find all users TESTING WTIH ASYNC
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userObj = {
                users, 
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    // Find one user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
            !user
               ? res.status(404).json({ message: 'No such user exists'})
               : res.json(user)
               )
               .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
    },
};
