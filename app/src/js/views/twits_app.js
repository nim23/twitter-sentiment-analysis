/** @jsx React.DOM */
'use strict';
var Backbone = require('../backbone_jquery');
var Twits = require('../collections/twits');
var Twit = require('../models/twit');
var Notification = require('../models/notification');
var twitsApp = require('../components/twits_app');
var notificationComp = require('../components/notification');
var React = require('react');

module.exports = Backbone.View.extend({
  initialize: function(){
    this.twits = new Twits(this.$el.data('state'));
    this.notification = new Notification({count: 0});
    this.newTwits = [];
    this.initializeSocket();
    this.page = 0;
    this.skip = 0;
    this.render();
  },
  initializeSocket: function(){
    this.socket = io.connect();
    this.socket.on('twit', function(data){
      var count = this.notification.get('count') + 1;
      this.notification.set({count: count});
      this.skip = this.skip + 1;
      this.newTwits.unshift(new Twit(data));
    }.bind(this));
  },
  showNewTweets: function(){
    this.twits.add(this.newTwits,{at: 0});
    this.notification.set({count: 0});
  },
  showPrevTweets: function(){
    var self = this;
    this.prevTwits = new Twits();
    this.prevTwits.url = '/page';
    this.page = this.page + 1;
    this.prevTwits.fetch({
      traditional: true,
      data:{page: this.page, skip: this.skip},
      success: function(resp){
        self.twits.add(resp.models, {at: self.twits.length});
      }
    });
  },
  detached: function(){
    this.socket.removeListener('twit');
  },
  render: function(){
    React.renderComponent(<twitsApp collection={this.twits}
                                    notification={this.notification}
                                    showNewTweets={this.showNewTweets.bind(this)}
                                    showPrevTweets={this.showPrevTweets.bind(this)}/>,
                          this.el);
  }
});
