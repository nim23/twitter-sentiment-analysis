/** @jsx React.DOM */
'use strict';
var React = require('react');

module.exports = React.createClass({
  render: function(){
    return (<span>
              <img src={this.props.imgUrl}/>
            </span>);
  }
});
