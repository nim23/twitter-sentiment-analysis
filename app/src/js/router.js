/** @jsx React.DOM */
'use strict';
var Backbone = require('./backbone_jquery.js');
var React = require('react');
var $ = require('jquery');
var hijackUrls = require('./hijack_urls.js');
var twits = require('./collections/twits/');

var Router = Backbone.Router.extend({
    routes: {
      'about': 'about',
      '*path': 'default'
    },
    default: function(){
      require.ensure([], function(){
        var twitApp = require('./components/twitApp.js');
        //React.renderComponent(<twitApp/>, $('#content')[0]);
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
