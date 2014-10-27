/** @jsx React.DOM */
'use strict';
var React = require('react');
var Twit = require('./twit');
var BackboneMixin = require('../mixins/backbone_mixin');

module.exports = React.createClass({
  mixins: [BackboneMixin],
  renderTwits: function(){
    return this.props.collection.map(function(model, index){
      return <Twit key={index} twit={model.toJSON() || model}/>
    });
  },
  render: function(){
    return (<div>
              {this.renderTwits()}
            </div>);
  }
});
