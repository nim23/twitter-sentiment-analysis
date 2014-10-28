/** @jsx React.DOM */
'use strict';
var React = require('react');
var navigation = require('./navigation');

/*
About component which basically renders the about page.
*/
module.exports = React.createClass({
  render: function(){
    return (<section className='about'>
              <navigation />
              <section className='about-content'>
                <h1>About</h1>
                <hr/>
                <h4>{'This is an Isomorphic application which fetches tweet in real time via twitter stream api and' +
                      ' processes the tweet through a sentiment analysis api and stores it to the database.'+
                      ' Once stored in the database the tweet is processed in the client app and renderd in real'+
                      ' time.'}
                </h4>
                <h4>{'Features of the application'}</h4>
                <ul>
                  <li>{'Red tweet means a tweet represents a negative sentimet while white means the tweet represents positive sentiment.'}</li>
                  <li>{'Application is first rendered in the server side with same components used in client side.'}</li>
                  <li>{'Application can run without javascript, however paging and real time display of tweets with sentiments wont work.'}</li>
                  <li>{'Application fetches each Backnone route asynchronously as this becomes affordatble with the use of server side rendering of the single page app.'}</li>
                </ul>
              </section>
            </section>);
  }
});
