const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Require models - does this go here?

// const { User } = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Finds all users
// app.get("/all-users", async (req, res) => {

//   try {
//     const users = await User.find({});

//     res.status(200).json(users);
//   } catch (err) {
//     console.log(err);
//   }
// });

// Add a new user
// app.post("/new-user/:user", (req, res) => {
//   const newUser = new User({ username: req.params.user });
//   newUser.save();
//   if (newUser) {
//     res.status(201).json(newUser);
//   } else {
//     console.log(`Oh geez, something went wrong`);
//     res.status(500).json({ error: `Something went wrong!` });
//   }
// });

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
