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

/***/ 157:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Backbone = __webpack_require__(2);
	var Twit = __webpack_require__(158);
	module.exports = Backbone.Collection.extend({
	  model: Twit
	});


/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Backbone = __webpack_require__(2);
	module.exports = Backbone.Model.extend({});


/***/ },

/***/ 159:
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

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var Backbone = __webpack_require__(2);
	var Twits = __webpack_require__(157);
	var Twit = __webpack_require__(158);
	var twitsApp = __webpack_require__(161);
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

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var Twit = __webpack_require__(8);
	var BackboneMixin = __webpack_require__(159);

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


/***/ }

});