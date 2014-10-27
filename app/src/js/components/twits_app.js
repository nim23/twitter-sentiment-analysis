/** @jsx React.DOM */
'use strict';
var React = require('react');
var Twit = require('./twit');
var notification = require('./notification');
var BackboneMixin = require('../mixins/backbone_mixin');

module.exports = React.createClass({
  mixins: [BackboneMixin],
  renderTwits: function(){
    return this.props.collection.map(function(model, index){
      return <Twit key={index} twit={model.toJSON() || model}/>
    });
  },
  render: function(){
    return (<div className='twits-app'>
              <notification model={this.props.notification}
                            onClick={this.props.showNewTweets}/>
              {this.renderTwits()}
            </div>);
  }
});
