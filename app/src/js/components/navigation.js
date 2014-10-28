/** @jsx React.DOM */
'use strict';
var React = require('react');
/*
Navigation Component with pre-defined set of routes
*/
module.exports = React.createClass({
  getInitialState: function(){
    return {
      pages: [{url: '/', text: 'Home'},
              {url: '/about', text: 'About'}]
    }
  },
  renderNavigation: function(){
    return this.state.pages.map(function(page, index){
            return (<a key={index} href={page.url}>{page.text}</a>);
    });
  },
  render: function(){
    return (
      <section className='navigation-wrapper'>
        <h2>{'Twitter Sentiment Analysis'}</h2>
        <div className='navigation'>
          {this.renderNavigation()}
        </div>
      </section>
    )
  }
});
