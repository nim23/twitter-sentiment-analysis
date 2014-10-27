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
    default: function(){
      require.ensure([], function(){
        var TwitsAppView = require('./views/twits_app');
        new TwitsAppView({el: '#content'});
      });
    },
    about: function(){
      require.ensure([], function(){
        var About = require('./components/about.js');
        React.renderComponent(<About/>, $('#content')[0]);
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
