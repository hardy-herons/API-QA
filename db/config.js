const mongoose = require('mongoose');

function connectToDb() {
  return mongoose.connect('mongodb://localhost:27017/SDCTest', {
    useNewUrlParser: true
  });
}

module.exports = connectToDb;
