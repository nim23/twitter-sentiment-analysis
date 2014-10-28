/** @jsx React.DOM */
'use strict';
var React = require('react');
var Twit = require('./twit');
var notification = require('./notification');
var navigation = require('./navigation');
var pageLoader = require('./page_loader');
var BackboneMixin = require('../mixins/backbone_mixin');

/*
Overall wrapper component for twits which includes navigation,
notification & page loader components. Also has a Backbone mixin
to re-render itself everytime the collection is updated.
*/
module.exports = React.createClass({
  mixins: [BackboneMixin],
  renderTwits: function(){
    return this.props.collection.map(function(model, index){
      return <Twit key={index} twit={model.toJSON() || model}/>
    });
  },
  render: function(){
    return (<section className='twits-app'>
              <navigation />
              <notification model={this.props.notification}
                            onClick={this.props.showNewTweets}/>
              {this.renderTwits()}
              <pageLoader onClick={this.props.showPrevTweets}/>
            </section>);
  }
});
