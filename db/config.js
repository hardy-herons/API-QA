const myDatabaseConnection = require("mongoose");

myDatabaseConnection.connect("mongodb://localhost:27017/SDC", {
  useNewUrlParser: true
});

module.exports = myDatabaseConnection;
