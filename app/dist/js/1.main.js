webpackJsonp([1],{

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var Backbone = __webpack_require__(2);
	var Twits = __webpack_require__(9);
	var Twit = __webpack_require__(10);
	var Notification = __webpack_require__(11);
	var twitsApp = __webpack_require__(7);
	var notificationComp = __webpack_require__(8);
	var React = __webpack_require__(6);

	module.exports = Backbone.View.extend({
	  initialize: function(){
	    this.twits = new Twits(this.$el.data('state'));
	    this.notification = new Notification({count: 0});
	    this.newTwits = [];
	    this.initializeSocket();
	    this.page = 0;
	    this.skip = 0;
	    this.render();
	  },
	  initializeSocket: function(){
	    this.socket = io.connect();
	    this.socket.on('twit', function(data){
	      var count = this.notification.get('count') + 1;
	      this.notification.set({count: count});
	      this.skip = this.skip + 1;
	      this.newTwits.unshift(new Twit(data));
	    }.bind(this));
	  },
	  showNewTweets: function(){
	    this.twits.add(this.newTwits,{at: 0});
	    this.notification.set({count: 0});
	  },
	  showPrevTweets: function(){
	    var self = this;
	    this.prevTwits = new Twits();
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
	  detached: function(){
	    this.socket.removeListener('twit');
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

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var Twit = __webpack_require__(12);
	var notification = __webpack_require__(8);
	var pageLoader = __webpack_require__(13);
	var BackboneMixin = __webpack_require__(14);

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
	              this.renderTwits(), 
	              pageLoader({onClick: this.props.showPrevTweets})
	            ));
	  }
	});


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var BackboneMixin = __webpack_require__(14);

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

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Backbone = __webpack_require__(2);
	var Twit = __webpack_require__(10);
	module.exports = Backbone.Collection.extend({
	  model: Twit
	});


/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Backbone = __webpack_require__(2);
	module.exports = Backbone.Model.extend({});


/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Backbone = __webpack_require__(2);
	module.exports = Backbone.Model.extend({});


/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var Avatar = __webpack_require__(18);
	var entities = __webpack_require__(175);

	module.exports = React.createClass({displayName: 'exports',
	  render: function(){
	    return (
	        React.DOM.div({className: 'twit ' + (this.props.twit.sentiment || 'positive')}, 
	          Avatar({imgUrl: this.props.twit.profile_image_url}), 
	          React.DOM.span({className: "twit-text"}, entities.decode(this.props.twit.text))
	        )
	    );
	  }
	});


/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	var React = __webpack_require__(6);
	var BackboneMixin = __webpack_require__(14);

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

/***/ 14:
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

/***/ 18:
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


/***/ },

/***/ 175:
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