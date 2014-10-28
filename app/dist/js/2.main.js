webpackJsonp([2],{

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var Backbone = __webpack_require__(2);
	var about = __webpack_require__(12);
	var React = __webpack_require__(6);

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
	var navigation = __webpack_require__(17);

	module.exports = React.createClass({displayName: 'exports',
	  render: function(){
	    return (React.DOM.section({className: "about"}, 
	              navigation(null), 
	              React.DOM.h1(null, "About"), 
	              React.DOM.hr(null), 
	              React.DOM.section({className: "about-content"}, 
	                React.DOM.h3(null, 'This application fetches tweet in real time via twitter stream api and' +
	                      ' processes the tweet through a sentiment analysis api and stores it to the database.'+
	                      ' Once stored in the database the tweet is processed in the client app and renderd in real'+
	                      ' time.'
	                ), 
	                React.DOM.h4(null, 'Features of the application'), 
	                React.DOM.ul(null, 
	                  React.DOM.li(null, 'Red tweet means a tweet represent a negative sentimet while white means the tweet represent positive sentiment.'), 
	                  React.DOM.li(null, 'Application is first rendered in the server side with same components used in client side.'), 
	                  React.DOM.li(null, 'Application can run without javascript, however paging and real time display of tweets wont work.'), 
	                  React.DOM.li(null, 'Application fetches each Backnone route asynchronously as this becomes affordatble with the use of server side rendering of the single page app.')
	                )
	              )
	            ));
	  }
	});


/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
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
	        React.DOM.div({className: "navigation"}, 
	          this.renderNavigation()
	        )
	      )
	    )
	  }
	});


/***/ }

});