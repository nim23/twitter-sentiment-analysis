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
    /*
    Change view takes care of calling any undelegation of events in views
    by calling a views detached method before they are removed from the DOM.
    */
    changeView: function(View){
      if(this.currentView){
          this.currentView.detached();
      }
      this.currentView = new View({el: '#content'});
    },
    /*
    Loads the twits_app view only when the default route is requested, as the JS for
    the twits_app view will not be bundled with the main application's bundle.
    When webpack sees require.ensure function it will create a separate chunk file
    for twits_app view and all of it's dependency tree.
    Since the page is initially rendered on the server side we can afford this for faster
    initial page load.
    */
    default: function(){
      var self = this;
      require.ensure([], function(){
        var TwitsAppView = require('./views/twits_app');
        self.changeView(TwitsAppView);
      });
    },
    /*
    Same applies here. The about view javascript is only loaded when requested and is not
    included in the main bundle file.
    */
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
