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
	var Notification = __webpack_require__(12);
	var twitsApp = __webpack_require__(8);
	var notificationComp = __webpack_require__(9);
	var React = __webpack_require__(6);

	module.exports = Backbone.View.extend({
	  initialize: function(){
	    this.twits = new Twits(this.$el.data('state'));
	    this.notification = new Notification({count: 0});
	    this.newTwits = [];
	    this.initializeSocket();
	    this.render();
	  },
	  initializeSocket: function(){
	    this.socket = io.connect();
	    this.socket.on('twit', function(data){
	      var count = this.notification.get('count') + 1;
	      this.notification.set({count: count});
	      this.newTwits.unshift(new Twit(data));
	    }.bind(this));
	  },
	  showNewTweets: function(){
	    this.twits.add(this.newTwits,{at: 0});
	    this.notification.set({count: 0});
	  },
	  detached: function(){
	    this.socket.removeListener('twit');
	  },
	  render: function(){
	    React.renderComponent(twitsApp({collection: this.twits, 
	                                    notification: this.notification, 
	                                    showNewTweets: this.showNewTweets.bind(this)}),
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
	var notification = __webpack_require__(9);
	var BackboneMixin = __webpack_require__(16);

	module.exports = React.createClass({displayName: 'exports',
	  mixins: [BackboneMixin],
	  renderTwits: function(){
	    return this.props.collection.map(function(model, index){
	      return Twit({key: index, twit: model.toJSON() || model})
	    });
	  },
	  render: function(){
	    return (React.DOM.div({className: "twits-app"}, 
	              notification({model: this.props.notification, 
	                            onClick: this.props.showNewTweets}), 
	              this.renderTwits()
	            ));
	  }
	});


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var BackboneMixin = __webpack_require__(16);

	module.exports = React.createClass({displayName: 'exports',
	  mixins: [BackboneMixin],
	  getNotificationText: function(notification){
	    var tweetsOrTweet = notification.count > 1 ? ' new tweets ' : ' new tweet ';
	    return 'Analysed sentiment of ' + notification.count + tweetsOrTweet;
	  },
	  onClick: function(){
	    this.props.onClick();
	  },
	  renderNotification: function(){
	    var notification = this.props.model ? this.props.model.toJSON() : undefined;

	    if(notification && notification.count > 0){
	      return React.DOM.div({className: "notification"}, 
	                this.getNotificationText(notification), 
	                React.DOM.a({href: "javascript:;", onClick: this.onClick}, 'Show Tweets')
	             );
	    }else{
	      return '';
	    }
	  },
	  render: function(){
	    return (React.DOM.div(null, 
	              this.renderNotification()
	            ));
	  }
	});


/***/ },
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Backbone = __webpack_require__(2);
	module.exports = Backbone.Model.extend({});


/***/ },
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
	        React.DOM.div({className: 'twit ' + (this.props.twit.sentiment || 'positive')}, 
	          Avatar({imgUrl: this.props.twit.profile_image_url}), 
	          React.DOM.span({className: "twit-text"}, this.props.twit.text)
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
	    return (React.DOM.span({className: "avatar"}, 
	              React.DOM.img({src: this.props.imgUrl})
	            ));
	  }
	});


/***/ }
]);