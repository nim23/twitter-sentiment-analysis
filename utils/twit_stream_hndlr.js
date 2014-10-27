'use strict';
var Tweet = require('../models/Tweet');
var getSentiment = require('./get_sentiment');

module.exports = function(stream, io){
  stream.on('data', function(data){

    getSentiment(data.text).then(function(resp){

      var sentimentAnalysis = JSON.parse(resp);

      var tweet = new Tweet({
        id: data.id,
        text: data.text,
        sentiment: sentimentAnalysis.sentiment,
        tweet_by: data.user.name,
        date: data.created_at,
        profile_image_url: data.user.profile_image_url,
        user_name: data.user.screen_name
      });

      //console.log(tweet);

       tweet.save(function(err){
         if(!err){
           console.log(tweet);
           //io.emit('tweet', tweet);
         }
       });

    });

  });
};
