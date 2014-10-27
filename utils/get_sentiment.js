'use strict';
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
    // console.log(result.body);
    deferred.resolve(result.body);
  });

  return deferred.promise;
};
