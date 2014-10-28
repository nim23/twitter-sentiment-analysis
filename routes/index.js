'use strict';
var React = require('react');
var express = require('express');
var router = express.Router();
var Twit = require('../models/Twit');
var AboutComp = require('../app/src/js/components/about');
var TwitsAppComp = require('../app/src/js/components/twits_app');

/* Render the index page.*/
function renderPage(req, res){
  Twit.getTwits(0,0).then(function(twits){
      var markup = React.renderComponentToString(TwitsAppComp({collection: twits}));
      res.render('index', {content: markup, state: twits});
    }, function(){
      res.render('index', {content: 'Error loading content!!'});
  });
}

router.get('/twits', function(req, res){
   Twit.getTwits(0, 0).then(function(docs) {
       res.send(docs);
   });
});

router.get('/page', function(req, res){
  Twit.getTwits(req.query.page, req.query.skip).then(function(docs) {
      res.send(docs);
  });
});

router.get('/about', function(req, res){
  var markup = React.renderComponentToString(AboutComp({}));
  res.render('index', {content: markup});
});

/* Get the index page. */
router.get('/', function(req, res) {
  renderPage(req, res);
});

module.exports = router;
