/** @jsx React.DOM */
'use strict';
var Backbone = require('./backbone_jquery');
var React = require('react');
var $ = require('jquery');
var hijackUrls = require('./hijack_urls');

var Router = Backbone.Router.extend({
    routes: {
      'about': 'about',
      '*path': 'default'
    },
    changeView: function(View){
      if(this.currentView){
          this.currentView.detached();
      }
      this.currentView = new View({el: '#content'});
    },
    default: function(){
      var self = this;
      require.ensure([], function(){
        var TwitsAppView = require('./views/twits_app');
        self.changeView(TwitsAppView);
      });
    },
    about: function(){
      var self = this;
      require.ensure([], function(){
        var AboutView = require('./views/about.js');
        self.changeView(AboutView);
      });
    }
});

module.exports = {
  initialize: function(){
    var router = new Router();
    Backbone.history.start({pushState: true}, {root: '/'});
    hijackUrls();
  }
};
