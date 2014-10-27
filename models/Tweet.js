var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  id: String,
  text: String,
  sentiment: String
});

module.exports = mongoose.model('Tweet', schema);
