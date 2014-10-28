/** @jsx React.DOM */
'use strict';
var Backbone = require('../backbone_jquery');
var about = require('../components/about');
var React = require('react');

module.exports = Backbone.View.extend({
  initialize: function(){
    this.render();
  },
  detached: function(){},
  render: function(){
    React.renderComponent(<about/>, this.el);
  }
});
