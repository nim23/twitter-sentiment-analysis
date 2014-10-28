webpackJsonp([2],{

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var Backbone = __webpack_require__(2);
	var about = __webpack_require__(12);
	var React = __webpack_require__(6);

	/*
	Renders the about React Component
	*/
	module.exports = Backbone.View.extend({
	  initialize: function(){
	    this.render();
	  },
	  detached: function(){},
	  render: function(){
	    React.renderComponent(about(null), this.el);
	  }
	});


/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var navigation = __webpack_require__(16);

	/*
	About component which basically renders the about page.
	*/
	module.exports = React.createClass({displayName: 'exports',
	  render: function(){
	    return (React.DOM.section({className: "about"}, 
	              navigation(null), 
	              React.DOM.section({className: "about-content"}, 
	                React.DOM.h1(null, "About"), 
	                React.DOM.hr(null), 
	                React.DOM.h4(null, 'This is an Isomorphic application which fetches tweet in real time via twitter stream api and' +
	                      ' processes the tweet through a sentiment analysis api and stores it to the database.'+
	                      ' Once stored in the database the tweet is processed in the client app and renderd in real'+
	                      ' time.'
	                ), 
	                React.DOM.h4(null, 'Features of the application'), 
	                React.DOM.ul(null, 
	                  React.DOM.li(null, 'Red tweet means a tweet represents a negative sentimet while white means the tweet represents positive sentiment.'), 
	                  React.DOM.li(null, 'Application is first rendered in the server side with same components used in client side.'), 
	                  React.DOM.li(null, 'Application can run without javascript, however paging and real time display of tweets with sentiments wont work.'), 
	                  React.DOM.li(null, 'Application fetches each Backnone route asynchronously as this becomes affordatble with the use of server side rendering of the single page app.')
	                )
	              )
	            ));
	  }
	});


/***/ },

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	/*
	Navigation Component with pre-defined set of routes
	*/
	module.exports = React.createClass({displayName: 'exports',
	  getInitialState: function(){
	    return {
	      pages: [{url: '/', text: 'Home'},
	              {url: '/about', text: 'About'}]
	    }
	  },
	  renderNavigation: function(){
	    return this.state.pages.map(function(page, index){
	            return (React.DOM.a({key: index, href: page.url}, page.text));
	    });
	  },
	  render: function(){
	    return (
	      React.DOM.section({className: "navigation-wrapper"}, 
	        React.DOM.h2(null, 'Twitter Sentiment Analysis'), 
	        React.DOM.div({className: "navigation"}, 
	          this.renderNavigation()
	        )
	      )
	    )
	  }
	});


/***/ }

});