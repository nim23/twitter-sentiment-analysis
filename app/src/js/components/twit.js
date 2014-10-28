/** @jsx React.DOM */
'use strict';
var React = require('react');
var Avatar = require('./avatar');
var entities = require('htmlentities');

module.exports = React.createClass({
  render: function(){
    return (
        <div className={'twit ' + (this.props.twit.sentiment || 'positive')}>
          <Avatar imgUrl={this.props.twit.profile_image_url}/>
          <span className='twit-text'>{entities.decode(this.props.twit.text)}</span>
        </div>
    );
  }
});
