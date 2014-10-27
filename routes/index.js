'use strict';
var React = require('react');
var express = require('express');
var router = express.Router();
var Twit = require('../models/Twit');
var TwitAppComp = require('../app/src/js/components/twitApp');

/* Render the index page.*/
function renderPage(req, res){
  Twit.getTwits(0,0).then(function(twits){
    console.log(twits);
      var markup = React.renderComponentToString(TwitAppComp({twits: twits}));
      res.render('index', {content: markup, state: twits});
    }, function(){
      res.render('index', {content: 'Error loading content'});
  });
}

/* Get the index page. */
router.get('/', function(req, res) {
  renderPage(req, res);
});

module.exports = router;
