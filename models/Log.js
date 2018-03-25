const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  type: {
    type: String,
    required: [true, 'type cant be empty']
  },
  power: {
    type: Number,
    required: [true, 'power cant be empty']
  },
  status: {
    type: String,
    required: [true, 'status cant be empty']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const History = mongoose.model('History', logSchema);
module.exports = History;