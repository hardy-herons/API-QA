const myDatabaseConnection = require("mongoose");

myDatabaseConnection.connect("mongodb://18.218.179.129:27017/SDC", {
  useNewUrlParser: true
});

module.exports = myDatabaseConnection;
