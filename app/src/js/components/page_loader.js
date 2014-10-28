/** @jsx React.DOM */
'use strict';
var React = require('react');
var BackboneMixin = require('../mixins/backbone_mixin');

/*
React component for page loader. When clicked calls the
callback from the twits_app view and causes the twits_app component
to re-render if there is any new data available.
*/
module.exports = React.createClass({
  onClick: function(){
    this.props.onClick();
  },
  render: function(){
    return (<a className='page-loader' href='javascript:;' onClick={this.onClick}>
              {'Load old tweets'}
            </a>);
  }
});
