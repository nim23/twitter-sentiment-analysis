'use strict';
var Backbone = require('./backbone_jquery.js');
var $ = require('jquery');

module.exports = function(){
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
