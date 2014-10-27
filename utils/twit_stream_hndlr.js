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
        sentiment: sentimentAnalysis.sentiment
      });

      console.log(tweet);

      // tweet.save(function(err){
      //   if(!err){
      //     io.emit('tweet', tweet);
      //   }
      // });

    });

  });
};
