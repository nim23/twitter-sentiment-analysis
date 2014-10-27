/** @jsx React.DOM */
'use strict';
var Backbone = require('../backbone_jquery');
var Twits = require('../collections/twits');
var Twit = require('../models/twit');
var twitsApp = require('../components/twits_app');
var React = require('react');

module.exports = Backbone.View.extend({
  initialize: function(){
    this.collection = new Twits(this.$el.data('state'));
    this.initializeSocket();
    this.render();
  },
  initializeSocket: function(){
    this.socket = io.connect();
    this.socket.on('twit', function(data){
      this.collection.add(new Twit(data));
    }.bind(this));
  },
  detached: function(){
    this.socket.removeListener('twit');
  },
  render: function(){
    React.renderComponent(<twitsApp collection={this.collection}/>,
                          this.el);
  }
});
