const { connect, connection } = require("mongoose");

const connectionString = "mongodb://127.0.0.1:27017/mysocialapiDB";

// Wrap Mongoose around local connection to MongoDB
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection
module.exports = connection;
