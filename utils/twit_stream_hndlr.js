'use strict';
var Twit = require('../models/Twit');
var getSentiment = require('./get_sentiment');

/*
Listen to stream data from twitter gets the sentiment value for the
twit and saves it to the database. Once saved into the database
fires a socket io event with the newly created twit as the payload.
*/
module.exports = function(stream, io){
  stream.on('data', function(data){

    getSentiment(data.text).then(function(resp){

      var sentimentAnalysis = JSON.parse(resp);

      var twit = new Twit({
        id: data.id,
        text: data.text,
        sentiment: sentimentAnalysis.sentiment,
        twit_by: data.user.name,
        date: data.created_at,
        profile_image_url: data.user.profile_image_url,
        user_name: data.user.screen_name
      });

       twit.save(function(err){
         if(!err){
           console.log(twit);
           io.emit('twit', twit);
         }
       });

    });

  });
};
