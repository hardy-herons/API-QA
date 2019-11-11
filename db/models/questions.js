const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    product_id: { type: Number, index: true },
    id: { type: Number, index: true },
    body: String,
    date: Date,
    asker_name: String,
    asker_email: String,
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

module.exports = mongoose.model('Questions', schema);
