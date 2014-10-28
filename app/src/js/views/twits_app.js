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
    this.initializeTwits();
    this.notification = new Notification({count: 0});
    this.newTwits = [];
    this.initializeSocket();
    this.page = 0;
    this.skip = 0;
    this.render();
  },
  /*
  When server renders the React component with specific set of data it expects the
  client side to have same set of data so that it doesn't have to re-render the
  view. To do this we pass in state/data into the #content dom and retrieve it on the
  client side and initialise our React component with same set of data. When we come
  to default page from about page then we fetch new set of data as we are back in the
  Single Page App mode.
  */
  initializeTwits: function(){
    if(this.$el.data('state')){
      this.twits = new Twits(this.$el.data('state'));
    }else{
      this.twits = new Twits([]);
      this.twits.url = '/twits';
      this.twits.fetch();
    }
  },
  /*
  Creates a web socket connection with the server for receiving real time updates.
  When server receives a new twit and fetches it sentiment it adds the twit to
  the database and triggers event stating that twit has been added. Client listens
  to these events and keeps hold of the data until the user has requested to see it.
  */
  initializeSocket: function(){
    this.socket = io.connect();
    this.socket.on('twit', function(data){
      var count = this.notification.get('count') + 1;
      this.notification.set({count: count});
      this.skip = this.skip + 1;
      this.newTwits.unshift(new Twit(data));
    }.bind(this));
  },
  /*
  This is a callback function for the notification component which will be inovked
  when the user asks to see the newly processed twits. When the twit collection is
  added the twits_app component automatically updates itself as it listens to any
  changes on the passed in collection or model. Since React is intelligent enough to
  re-render the DOM without taxing the browser we can afford to re-render the entire view
  on every single change.
  */
  showNewTweets: function(){
    this.twits.add(this.newTwits,{at: 0});
    this.notification.set({count: 0});
  },
  /*
  This is a callback function for page_loader component which get's invoked when
  the user asks for previously analysed twits. The addition to collection automatically
  triggers the React component to be re-rendered.
  */
  showPrevTweets: function(){
    var self = this;
    this.prevTwits = new Twits([]);
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
  /*
  Clean up view events and data state as it is no longer needed after the
  initial render.
  */
  detached: function(){
    this.socket.removeListener('twit');
    this.$el.data('state', '');
  },
  render: function(){
    React.renderComponent(<twitsApp collection={this.twits}
                                    notification={this.notification}
                                    showNewTweets={this.showNewTweets.bind(this)}
                                    showPrevTweets={this.showPrevTweets.bind(this)}/>,
                          this.el);
  }
});
