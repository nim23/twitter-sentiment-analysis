/** @jsx React.DOM */
'use strict';
var React = require('react');
var Avatar = require('./avatar');
var entities = require('htmlentities');

/*
React component responsible for displaying twit.
*/
module.exports = React.createClass({
  render: function(){
    return (
        <div className={'twit ' + (this.props.twit.sentiment || 'positive')}>
          <Avatar imgUrl={this.props.twit.profile_image_url}/>
            <div className='twit-content'>
              <div className='twit-by'>
                <a target='_blank' href={'http://www.twitter.com/' + this.props.twit.user_name}>{this.props.twit.twit_by}</a>
                <span className='user-name'> @{this.props.twit.user_name}</span>
              </div>
              <div className='twit-text'>
                {entities.decode(this.props.twit.text)}
              </div>
            </div>
        </div>
    );
  }
});
