/** @jsx React.DOM */
'use strict';
var React = require('react');
var Avatar = require('./avatar');

module.exports = React.createClass({
  render: function(){
    return (
        <div>
          <Avatar imgUrl={this.props.twit.profile_image_url}/>
          {this.props.twit.text}
        </div>
    );
  }
});
