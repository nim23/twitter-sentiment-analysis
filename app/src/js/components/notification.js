/** @jsx React.DOM */
'use strict';
var React = require('react');
var BackboneMixin = require('../mixins/backbone_mixin');
/*
Notification React Component only visible when the notification
count is more than one. Re-renders itself based on the notification
model passed in from the twits_app view. When clicked calls the callback
form twits_app view which adds new data to the twits collection and
caused the twits_app component to re-render.
*/
module.exports = React.createClass({
  mixins: [BackboneMixin],
  getNotificationText: function(notification){
    var tweetsOrTweet = notification.count > 1 ? ' new tweets ' : ' new tweet ';
    return 'Analysed sentiment of ' + notification.count + tweetsOrTweet;
  },
  onClick: function(){
    this.props.onClick();
  },
  renderNotification: function(){
    var notification = this.props.model ? this.props.model.toJSON() : undefined;

    if(notification && notification.count > 0){
      return <div className='notification'>
                {this.getNotificationText(notification)}
                <a href='javascript:;' onClick={this.onClick}>{'Show Tweets'}</a>
             </div>;
    }else{
      return '';
    }
  },
  render: function(){
    return (<div>
              {this.renderNotification()}
            </div>);
  }
});
