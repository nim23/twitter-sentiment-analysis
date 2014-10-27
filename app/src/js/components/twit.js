/** @jsx React.DOM */
'use strict';
var React = require('react');
var Avatar = require('./avatar');
var Encoder = require('node-html-encoder').Encoder;

module.exports = React.createClass({
  render: function(){
    var encoder = new Encoder('entity');
    return (
        <div className='twit'>
          <Avatar imgUrl={this.props.twit.profile_image_url}/>
          {encoder.htmlEncode(this.props.twit.text)}
        </div>
    );
  }
});
