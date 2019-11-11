const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    id: { type: Number, index: true },
    question_id: { type: Number, index: true },
    body: String,
    date: Date,
    answerer_name: String,
    answerer_email: String,
    helpfulness: Number,
    reported: {
      type: Number,
      min: 0,
      max: 1
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Answers', schema);
