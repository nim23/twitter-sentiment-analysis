var mongoose = require('mongoose');

var schema = new mongoose.Schema({
                  id: String,
                  text: String,
                  sentiment: String,
                  tweet_by: String,
                  profile_image_url: String,
                  date : Date,
                  user_name: String
            });

module.exports = mongoose.model('Tweet', schema);
