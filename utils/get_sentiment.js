'use strict';
/*
Given a specified a text this module passes the text to sentiment
analysis api returns it users to whoever is called the promise based
exported function.
*/
var unirest = require('unirest');
var Q = require('q');
var config = require('../config');

function genEndpointUrl(text){
  return config.tweetSentiment.getEndpointWithKey() + '&text=' +  encodeURIComponent(text);
}

module.exports = function(text){
  var deferred = Q.defer();

  unirest.get(genEndpointUrl(text))
  .end(function (result) {
    deferred.resolve(result.body);
  });

  return deferred.promise;
};
