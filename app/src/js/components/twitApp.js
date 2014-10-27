/** @jsx React.DOM */
'use strict';
var React = require('react');
var Twit = require('./twit');

module.exports = React.createClass({
  renderTwits: function(){
    return this.props.twits.map(function(model, index){
      return <Twit key={index} twit={model.toJSON() || model}/>
    })
  },
  render: function(){
    return (<div>
              {this.renderTwits()}
            </div>);
  }
});
