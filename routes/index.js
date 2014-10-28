'use strict';
var React = require('react');
var express = require('express');
var router = express.Router();
var Twit = require('../models/Twit');
var AboutComp = require('../app/src/js/components/about');
var TwitsAppComp = require('../app/src/js/components/twits_app');

/*
Gets the 10 latest twits and passes it to the TwitsAppComp which is a React
Component. We then render the component on the server side and pass the state/data
onto a DOM node so that on client the component does not have to re-render.
*/
function renderPage(req, res){
  Twit.getTwits(0,0).then(function(twits){
      var markup = React.renderComponentToString(TwitsAppComp({collection: twits}));
      res.render('index', {content: markup, state: twits});
    }, function(){
      res.render('index', {content: 'Error loading content!!'});
  });
}

/*
End point for fetching 10 latest twits for situation where server side
rendering and socket io data is not applicable. For example when
user comes to the default page after first visiting the about page. Because
at that point the client side should already have taken over.
*/
router.get('/twits', function(req, res){
   Twit.getTwits(0, 0).then(function(docs) {
       res.send(docs);
   });
});

/*
Returns twits based on page and skip value
*/
router.get('/page', function(req, res){
  Twit.getTwits(req.query.page, req.query.skip).then(function(docs) {
      res.send(docs);
  });
});

/*
Returns the server renderd about page
*/
router.get('/about', function(req, res){
  var markup = React.renderComponentToString(AboutComp({}));
  res.render('index', {content: markup});
});

/*
Get the index page.
*/
router.get('/', function(req, res) {
  renderPage(req, res);
});

module.exports = router;
