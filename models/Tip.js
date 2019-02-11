const mongoose = require('mongoose');

var tipSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Anonymous'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tip', tipSchema);
