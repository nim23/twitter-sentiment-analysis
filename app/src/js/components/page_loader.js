/** @jsx React.DOM */
'use strict';
var React = require('react');
var BackboneMixin = require('../mixins/backbone_mixin');

module.exports = React.createClass({
  onClick: function(){
    this.props.onClick();
  },
  render: function(){
    return (<a className='load-page' href='javascript:;' onClick={this.onClick}>
              {'Load old tweets.'}
            </a>);
  }
});
