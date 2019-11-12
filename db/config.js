const myDatabaseConnection = require('mongoose');
// function connectToDb() {
myDatabaseConnection.connect('mongodb://localhost:27017/SDCTest', {
  useNewUrlParser: true
});
// }

module.exports = myDatabaseConnection;
