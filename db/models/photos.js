const mongoose = require('../config');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    id: { type: Number, index: true },
    url: String,
    answer_id: {
      type: Schema.Types.ObjectId,
      ref: 'Answers'
    }
    // answer_id: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Photos', schema);
