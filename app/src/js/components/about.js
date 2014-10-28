/** @jsx React.DOM */
'use strict';
var React = require('react');
var navigation = require('./navigation');

module.exports = React.createClass({
  render: function(){
    return (<section className='about'>
              <navigation />
              <h1>About</h1>
              <hr/>
              <section className='about-content'>
                <h3>{'This application fetches tweet in real time via twitter stream api and' +
                      ' processes the tweet through a sentiment analysis api and stores it to the database.'+
                      ' Once stored in the database the tweet is processed in the client app and renderd in real'+
                      ' time.'}
                </h3>
                <h4>{'Features of the application'}</h4>
                <ul>
                  <li>{'Red tweet means a tweet represent a negative sentimet while white means the tweet represent positive sentiment.'}</li>
                  <li>{'Application is first rendered in the server side with same components used in client side.'}</li>
                  <li>{'Application can run without javascript, however paging and real time display of tweets wont work.'}</li>
                  <li>{'Application fetches each Backnone route asynchronously as this becomes affordatble with the use of server side rendering of the single page app.'}</li>
                </ul>
              </section>
            </section>);
  }
});
