webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var Backbone = __webpack_require__(2);
	var Twits = __webpack_require__(10);
	var Twit = __webpack_require__(11);
	var twitsApp = __webpack_require__(8);
	var React = __webpack_require__(6);

	module.exports = Backbone.View.extend({
	  initialize: function(){
	    this.collection = new Twits(this.$el.data('state'));
	    this.initializeSocket();
	    this.render();
	  },
	  initializeSocket: function(){
	    this.socket = io.connect();
	    this.socket.on('twit', function(data){
	      this.collection.add(new Twit(data));
	    }.bind(this));
	  },
	  detached: function(){
	    this.socket.removeListener('twit');
	  },
	  render: function(){
	    React.renderComponent(twitsApp({collection: this.collection}),
	                          this.el);
	  }
	});


/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var Twit = __webpack_require__(15);
	var BackboneMixin = __webpack_require__(16);

	module.exports = React.createClass({displayName: 'exports',
	  mixins: [BackboneMixin],
	  renderTwits: function(){
	    return this.props.collection.map(function(model, index){
	      return Twit({key: index, twit: model.toJSON() || model})
	    });
	  },
	  render: function(){
	    return (React.DOM.div(null, 
	              this.renderTwits()
	            ));
	  }
	});


/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Backbone = __webpack_require__(2);
	var Twit = __webpack_require__(11);
	module.exports = Backbone.Collection.extend({
	  model: Twit
	});


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Backbone = __webpack_require__(2);
	module.exports = Backbone.Model.extend({});


/***/ },
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var Avatar = __webpack_require__(17);

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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = {
		componentDidMount: function(){
				this._boundForceUpdate = this.forceUpdate.bind(this, null);
				this.getBackboneObject().on('all', this._boundForceUpdate, this);
			},
		componentWillUnmount: function(){
				this.getBackboneObject().off('all', this._boundForceUpdate);
			},
		getBackboneObject: function(){
				return this.props.collection || this.props.model;
			}
	};


/***/ },
/* 17 */
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


/***/ }
]);