/** @jsx React.DOM */
'use strict';
var React = require('react');
var BackboneMixin = require('../mixins/backbone_mixin');

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
      return <span>
                {this.getNotificationText(notification)}
                <a href='javascript:;' onClick={this.onClick}>{'Show Tweets'}</a>
             </span>;
    }else{
      return '';
    }
  },
  render: function(){
    return (<div className='notification'>
              {this.renderNotification()}
            </div>);
  }
});
