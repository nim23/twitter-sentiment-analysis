'use strict';
var Backbone = require('./backbone_jquery.js');
var $ = require('jquery');

module.exports = function(){
	/*
	Listens to all the clicks on a tags in the application.
	Needed so that application doesn't fetch the server rendered view
	when history pushState and javascript is enabled.
	*/
	$(document).delegate('a', 'click', function(evt) {
				var href = $(this).attr('href');
				var protocol = this.protocol + '//';
				var target = $(this).attr('target');

				if (target !== '_blank' && href.slice(protocol.length) !== protocol && protocol !== 'javascript://' && href.substring(0, 1) !== '#') {
					evt.preventDefault();
					Backbone.history.navigate(href, true);
				}
			});
};
