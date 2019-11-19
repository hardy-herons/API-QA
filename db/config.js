const myDatabaseConnection = require("mongoose");

myDatabaseConnection.connect("mongodb://localhost:27017/CPUTest", {
  useNewUrlParser: true
});

module.exports = myDatabaseConnection;

// const mongoose = require("mongoose");

// function connectToDb() {
//   return mongoose.connect("mongodb://localhost:27017/CPUTest", {
//     useNewUrlParser: true
//   });
// }

// module.exports = connectToDb;
