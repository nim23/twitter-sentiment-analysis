'use strict';
var Backbone = require('./backbone_jquery');
var Twit = require('../models/twit');
module.exports = Backbone.collection.extend({
  model: Twit
});
