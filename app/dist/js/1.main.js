webpackJsonp([1],{

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var Avatar = __webpack_require__(155);

	module.exports = React.createClass({displayName: 'exports',
	  render: function(){
	    return (
	        React.DOM.div(null, 
	          Avatar({imgUrl: this.props.twit.profile_image_url}), 
	          this.props.twit.text
	        )
	    );
	  }
	});


/***/ },

/***/ 155:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);

	module.exports = React.createClass({displayName: 'exports',
	  render: function(){
	    return (React.DOM.span(null, 
	              React.DOM.img({src: this.props.imgUrl})
	            ));
	  }
	});


/***/ },

/***/ 156:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var Twit = __webpack_require__(8);

	module.exports = React.createClass({displayName: 'exports',
	  renderTwits: function(){
	    return this.props.twits.map(function(model, index){
	      return Twit({key: index, twit: model.toJSON() || model})
	    })
	  },
	  render: function(){
	    return (React.DOM.div(null, 
	              this.renderTwits()
	            ));
	  }
	});


/***/ }

});