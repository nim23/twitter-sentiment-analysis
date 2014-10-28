webpackJsonp([1],{

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var Backbone = __webpack_require__(2);
	var Twits = __webpack_require__(7);
	var Twit = __webpack_require__(8);
	var Notification = __webpack_require__(9);
	var twitsApp = __webpack_require__(10);
	var notificationComp = __webpack_require__(11);
	var React = __webpack_require__(6);

	module.exports = Backbone.View.extend({
	  initialize: function(){
	    this.initializeTwits();
	    this.notification = new Notification({count: 0});
	    this.newTwits = [];
	    this.initializeSocket();
	    this.page = 0;
	    this.skip = 0;
	    this.render();
	  },
	  /*
	  When server renders the React component with specific set of data it expects the
	  client side to have same set of data so that it doesn't have to re-render the
	  view. To do this we pass in state/data into the #content dom and retrieve it on the
	  client side and initialise our React component with same set of data. When we come
	  to default page from about page then we fetch new set of data as we are back in the
	  Single Page App mode.
	  */
	  initializeTwits: function(){
	    if(this.$el.data('state')){
	      this.twits = new Twits(this.$el.data('state'));
	    }else{
	      this.twits = new Twits([]);
	      this.twits.url = '/twits';
	      this.twits.fetch();
	    }
	  },
	  /*
	  Creates a web socket connection with the server for receiving real time updates.
	  When server receives a new twit and fetches it sentiment it adds the twit to
	  the database and triggers event stating that twit has been added. Client listens
	  to these events and keeps hold of the data until the user has requested to see it.
	  */
	  initializeSocket: function(){
	    this.socket = io.connect();
	    this.socket.on('twit', function(data){
	      var count = this.notification.get('count') + 1;
	      this.notification.set({count: count});
	      this.skip = this.skip + 1;
	      this.newTwits.unshift(new Twit(data));
	    }.bind(this));
	  },
	  /*
	  This is a callback function for the notification component which will be inovked
	  when the user asks to see the newly processed twits. When the twit collection is
	  added the twits_app component automatically updates itself as it listens to any
	  changes on the passed in collection or model. Since React is intelligent enough to
	  re-render the DOM without taxing the browser we can afford to re-render the entire view
	  on every single change.
	  */
	  showNewTweets: function(){
	    this.twits.add(this.newTwits,{at: 0});
	    this.notification.set({count: 0});
	  },
	  /*
	  This is a callback function for page_loader component which get's invoked when
	  the user asks for previously analysed twits. The addition to collection automatically
	  triggers the React component to be re-rendered.
	  */
	  showPrevTweets: function(){
	    var self = this;
	    this.prevTwits = new Twits([]);
	    this.prevTwits.url = '/page';
	    this.page = this.page + 1;
	    this.prevTwits.fetch({
	      traditional: true,
	      data:{page: this.page, skip: this.skip},
	      success: function(resp){
	        self.twits.add(resp.models, {at: self.twits.length});
	      }
	    });
	  },
	  /*
	  Clean up view events and data state as it is no longer needed after the
	  initial render.
	  */
	  detached: function(){
	    this.socket.removeListener('twit');
	    this.$el.data('state', '');
	  },
	  render: function(){
	    React.renderComponent(twitsApp({collection: this.twits, 
	                                    notification: this.notification, 
	                                    showNewTweets: this.showNewTweets.bind(this), 
	                                    showPrevTweets: this.showPrevTweets.bind(this)}),
	                          this.el);
	  }
	});


/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Backbone = __webpack_require__(2);
	var Twit = __webpack_require__(8);
	module.exports = Backbone.Collection.extend({
	  model: Twit
	});


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Backbone = __webpack_require__(2);
	module.exports = Backbone.Model.extend({});


/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Backbone = __webpack_require__(2);
	module.exports = Backbone.Model.extend({});


/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var Twit = __webpack_require__(15);
	var notification = __webpack_require__(11);
	var navigation = __webpack_require__(16);
	var pageLoader = __webpack_require__(17);
	var BackboneMixin = __webpack_require__(18);

	/*
	Overall wrapper component for twits which includes navigation,
	notification & page loader components. Also has a Backbone mixin
	to re-render itself everytime the collection is updated.
	*/
	module.exports = React.createClass({displayName: 'exports',
	  mixins: [BackboneMixin],
	  renderTwits: function(){
	    return this.props.collection.map(function(model, index){
	      return Twit({key: index, twit: model.toJSON() || model})
	    });
	  },
	  render: function(){
	    return (React.DOM.section({className: "twits-app"}, 
	              navigation(null), 
	              notification({model: this.props.notification, 
	                            onClick: this.props.showNewTweets}), 
	              this.renderTwits(), 
	              pageLoader({onClick: this.props.showPrevTweets})
	            ));
	  }
	});


/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var BackboneMixin = __webpack_require__(18);
	/*
	Notification React Component only visible when the notification
	count is more than one. Re-renders itself based on the notification
	model passed in from the twits_app view. When clicked calls the callback
	form twits_app view which adds new data to the twits collection and
	caused the twits_app component to re-render.
	*/
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

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var Avatar = __webpack_require__(20);
	var entities = __webpack_require__(43);

	/*
	React component responsible for displaying twit.
	*/
	module.exports = React.createClass({displayName: 'exports',
	  render: function(){
	    return (
	        React.DOM.div({className: 'twit ' + (this.props.twit.sentiment || 'positive')}, 
	          Avatar({imgUrl: this.props.twit.profile_image_url}), 
	            React.DOM.div({className: "twit-content"}, 
	              React.DOM.div({className: "twit-by"}, 
	                React.DOM.a({target: "_blank", href: 'http://www.twitter.com/' + this.props.twit.user_name}, this.props.twit.twit_by), 
	                React.DOM.span({className: "user-name"}, " @", this.props.twit.user_name)
	              ), 
	              React.DOM.div({className: "twit-text"}, 
	                entities.decode(this.props.twit.text)
	              )
	            )
	        )
	    );
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


/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var BackboneMixin = __webpack_require__(18);

	/*
	React component for page loader. When clicked calls the
	callback from the twits_app view and causes the twits_app component
	to re-render if there is any new data available.
	*/
	module.exports = React.createClass({displayName: 'exports',
	  onClick: function(){
	    this.props.onClick();
	  },
	  render: function(){
	    return (React.DOM.a({className: "page-loader", href: "javascript:;", onClick: this.onClick}, 
	              'Load old tweets'
	            ));
	  }
	});


/***/ },

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/*
	Backbone mixin which listens to all the events
	on the passed in collection or model and re-renders
	the react component using this.forceUpdate.
	*/
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

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	/*
	Avatar component which simply displays user profile image.
	*/
	module.exports = React.createClass({displayName: 'exports',
	  render: function(){
	    return (React.DOM.span({className: "avatar"}, 
	              React.DOM.img({src: this.props.imgUrl})
	            ));
	  }
	});


/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * entities.js v1.0.0
	 * @author Alex Duloz ~ @alexduloz ~ http://bitspushedaround.com/
	 * MIT license
	 */

	(function() {

		var root = this;

		//
		// Tables / Maps
		//
		var tables = {};

		//
		// UTF-8
		//
		tables["utf8"] = {
			" ": "&nbsp;",
			"¡": "&iexcl;",
			"¢": "&cent;",
			"£": "&pound;",
			"¤": "&curren;",
			"¥": "&yen;",
			"¦": "&brvbar;",
			"§": "&sect;",
			"¨": "&uml;",
			"©": "&copy;",
			"ª": "&ordf;",
			"«": "&laquo;",
			"¬": "&not;",
			"­": "&shy;",
			"®": "&reg;",
			"¯": "&macr;",
			"°": "&deg;",
			"±": "&plusmn;",
			"²": "&sup2;",
			"³": "&sup3;",
			"´": "&acute;",
			"µ": "&micro;",
			"¶": "&para;",
			"·": "&middot;",
			"¸": "&cedil;",
			"¹": "&sup1;",
			"º": "&ordm;",
			"»": "&raquo;",
			"¼": "&frac14;",
			"½": "&frac12;",
			"¾": "&frac34;",
			"¿": "&iquest;",
			"À": "&Agrave;",
			"Á": "&Aacute;",
			"Â": "&Acirc;",
			"Ã": "&Atilde;",
			"Ä": "&Auml;",
			"Å": "&Aring;",
			"Æ": "&AElig;",
			"Ç": "&Ccedil;",
			"È": "&Egrave;",
			"É": "&Eacute;",
			"Ê": "&Ecirc;",
			"Ë": "&Euml;",
			"Ì": "&Igrave;",
			"Í": "&Iacute;",
			"Î": "&Icirc;",
			"Ï": "&Iuml;",
			"Ð": "&ETH;",
			"Ñ": "&Ntilde;",
			"Ò": "&Ograve;",
			"Ó": "&Oacute;",
			"Ô": "&Ocirc;",
			"Õ": "&Otilde;",
			"Ö": "&Ouml;",
			"×": "&times;",
			"Ø": "&Oslash;",
			"Ù": "&Ugrave;",
			"Ú": "&Uacute;",
			"Û": "&Ucirc;",
			"Ü": "&Uuml;",
			"Ý": "&Yacute;",
			"Þ": "&THORN;",
			"ß": "&szlig;",
			"à": "&agrave;",
			"á": "&aacute;",
			"â": "&acirc;",
			"ã": "&atilde;",
			"ä": "&auml;",
			"å": "&aring;",
			"æ": "&aelig;",
			"ç": "&ccedil;",
			"è": "&egrave;",
			"é": "&eacute;",
			"ê": "&ecirc;",
			"ë": "&euml;",
			"ì": "&igrave;",
			"í": "&iacute;",
			"î": "&icirc;",
			"ï": "&iuml;",
			"ð": "&eth;",
			"ñ": "&ntilde;",
			"ò": "&ograve;",
			"ó": "&oacute;",
			"ô": "&ocirc;",
			"õ": "&otilde;",
			"ö": "&ouml;",
			"÷": "&divide;",
			"ø": "&oslash;",
			"ù": "&ugrave;",
			"ú": "&uacute;",
			"û": "&ucirc;",
			"ü": "&uuml;",
			"ý": "&yacute;",
			"þ": "&thorn;",
			"ÿ": "&yuml;",
			"Œ": "&OElig;",
			"œ": "&oelig;",
			"Š": "&Scaron;",
			"š": "&scaron;",
			"Ÿ": "&Yuml;",
			"ƒ": "&fnof;",
			"ˆ": "&circ;",
			"˜": "&tilde;",
			"Α": "&Alpha;",
			"Β": "&Beta;",
			"Γ": "&Gamma;",
			"Δ": "&Delta;",
			"Ε": "&Epsilon;",
			"Ζ": "&Zeta;",
			"Η": "&Eta;",
			"Θ": "&Theta;",
			"Ι": "&Iota;",
			"Κ": "&Kappa;",
			"Λ": "&Lambda;",
			"Μ": "&Mu;",
			"Ν": "&Nu;",
			"Ξ": "&Xi;",
			"Ο": "&Omicron;",
			"Π": "&Pi;",
			"Ρ": "&Rho;",
			"Σ": "&Sigma;",
			"Τ": "&Tau;",
			"Υ": "&Upsilon;",
			"Φ": "&Phi;",
			"Χ": "&Chi;",
			"Ψ": "&Psi;",
			"Ω": "&Omega;",
			"α": "&alpha;",
			"β": "&beta;",
			"γ": "&gamma;",
			"δ": "&delta;",
			"ε": "&epsilon;",
			"ζ": "&zeta;",
			"η": "&eta;",
			"θ": "&theta;",
			"ι": "&iota;",
			"κ": "&kappa;",
			"λ": "&lambda;",
			"μ": "&mu;",
			"ν": "&nu;",
			"ξ": "&xi;",
			"ο": "&omicron;",
			"π": "&pi;",
			"ρ": "&rho;",
			"ς": "&sigmaf;",
			"σ": "&sigma;",
			"τ": "&tau;",
			"υ": "&upsilon;",
			"φ": "&phi;",
			"χ": "&chi;",
			"ψ": "&psi;",
			"ω": "&omega;",
			"ϑ": "&thetasym;",
			"ϒ": "&upsih;",
			"ϖ": "&piv;",
			" ": "&ensp;",
			" ": "&emsp;",
			" ": "&thinsp;",
			"‌": "&zwnj;",
			"‍": "&zwj;",
			"‎": "&lrm;",
			"‏": "&rlm;",
			"–": "&ndash;",
			"—": "&mdash;",
			"‘": "&lsquo;",
			"’": "&rsquo;",
			"‚": "&sbquo;",
			"“": "&ldquo;",
			"”": "&rdquo;",
			"„": "&bdquo;",
			"†": "&dagger;",
			"‡": "&Dagger;",
			"•": "&bull;",
			"…": "&hellip;",
			"‰": "&permil;",
			"′": "&prime;",
			"″": "&Prime;",
			"‹": "&lsaquo;",
			"›": "&rsaquo;",
			"‾": "&oline;",
			"⁄": "&frasl;",
			"€": "&euro;",
			"ℑ": "&image;",
			"℘": "&weierp;",
			"ℜ": "&real;",
			"™": "&trade;",
			"ℵ": "&alefsym;",
			"←": "&larr;",
			"↑": "&uarr;",
			"→": "&rarr;",
			"↓": "&darr;",
			"↔": "&harr;",
			"↵": "&crarr;",
			"⇐": "&lArr;",
			"⇑": "&uArr;",
			"⇒": "&rArr;",
			"⇓": "&dArr;",
			"⇔": "&hArr;",
			"∀": "&forall;",
			"∂": "&part;",
			"∃": "&exist;",
			"∅": "&empty;",
			"∇": "&nabla;",
			"∈": "&isin;",
			"∉": "&notin;",
			"∋": "&ni;",
			"∏": "&prod;",
			"∑": "&sum;",
			"−": "&minus;",
			"∗": "&lowast;",
			"√": "&radic;",
			"∝": "&prop;",
			"∞": "&infin;",
			"∠": "&ang;",
			"∧": "&and;",
			"∨": "&or;",
			"∩": "&cap;",
			"∪": "&cup;",
			"∫": "&int;",
			"∴": "&there4;",
			"∼": "&sim;",
			"≅": "&cong;",
			"≈": "&asymp;",
			"≠": "&ne;",
			"≡": "&equiv;",
			"≤": "&le;",
			"≥": "&ge;",
			"⊂": "&sub;",
			"⊃": "&sup;",
			"⊄": "&nsub;",
			"⊆": "&sube;",
			"⊇": "&supe;",
			"⊕": "&oplus;",
			"⊗": "&otimes;",
			"⊥": "&perp;",
			"⋅": "&sdot;",
			"⌈": "&lceil;",
			"⌉": "&rceil;",
			"⌊": "&lfloor;",
			"⌋": "&rfloor;",
			"〈": "&lang;",
			"〉": "&rang;",
			"◊": "&loz;",
			"♠": "&spades;",
			"♣": "&clubs;",
			"♥": "&hearts;",
			"♦": "&diams;",
			"&": "&amp;",
			'"': "&quot;",
			"'": "&#039;",
			"<": "&lt;",
			">": "&gt;",
		};

		//
		// Helpers
		//
		function invert(table) {
			var result = {};
			for (var prop in table) {
				result[table[prop]] = prop;
			}
			return result;
		}

		function keys(obj) {
			var keys = [];
			for (var key in obj) {
				keys.push(key);
			}
			return keys;
		};

		//
		// Used internally for replacements
		//
		var encodings = {};
		var regexes = {};

		for (var table in tables) {

			encodings[table] = {
				encode: tables[table],
				decode: invert(tables[table])
			};

			regexes[table] = {
				encode: new RegExp('[' + keys(encodings[table].encode).join('') + ']', 'g'),
				decode: new RegExp('(' + keys(encodings[table].decode).join('|') + ')', 'g')
			};
		};

		//
		// Our plugin's methods
		//
		var methods = ["encode", "decode"];

		//
		// Implement methods
		//
		function implement(method) {
			htmlentities[method] = function(string, encoding) {

				if (string === null) {
					return "";
				}

				var table = encoding || "utf8";

				return ("" + string).replace(regexes[table][method], function(match) {
					return encodings[table][method][match];
				});

			}
		}
		//
		// Our actual plugin
		//
		htmlentities = {};

		//
		// Build it
		//
		for (var i = 0; i < methods.length; i++) {
			implement(methods[i]);
		};

		// 
		// Server or client ?
		//
		if (true) {
			if (typeof module !== 'undefined' && module.exports) {
				exports = module.exports = htmlentities;
			}
			exports.htmlentities = htmlentities;
		} else {
			root.htmlentities = htmlentities;
		}

	}).call(this);

/***/ }

});