'use strict'
var Q = require('q');
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

schema.statics.getTwits = function(page, skip){
  var deferred = Q.defer(),
      start = (page * 10) + (skip * 1);

      Twit.find({},'',{skip: start, limit: 10})
          .sort({date: 'desc'})
          .exec(function(err, docs){
            if(!err){
              deferred.resolve(docs);
            }else{
              deferred.reject(err);
            }
          });

      return deferred.promise;
}

var Twit = mongoose.model('Twit', schema);
module.exports = Twit;
