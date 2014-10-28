'use strict';
var twitter = require('ntwitter');
var twitStreamHndlr = require('./utils/twit_stream_hndlr');
var config = require('./config');

/*
Setup stream handler for twitter's stream
*/
module.exports = function(io){
  var twit = new twitter(config.twitter);
  twit.stream('statuses/filter',{ track: 'burberry, #burberry', language: 'en'}, function(stream){
    twitStreamHndlr(stream,io);
  });
};
