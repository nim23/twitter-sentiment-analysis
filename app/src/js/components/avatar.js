/** @jsx React.DOM */
'use strict';
var React = require('react');
/*
Avatar component which simply displays user profile image.
*/
module.exports = React.createClass({
  render: function(){
    return (<span className='avatar'>
              <img src={this.props.imgUrl}/>
            </span>);
  }
});
