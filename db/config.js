const myDatabaseConnection = require('mongoose');

myDatabaseConnection.connect('mongodb://localhost:27017/SDCTest', {
  useNewUrlParser: true
});

module.exports = myDatabaseConnection;
