/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Viewports = __webpack_require__(1);
	
	var _Viewports2 = _interopRequireDefault(_Viewports);
	
	var _Video = __webpack_require__(2);
	
	var _Video2 = _interopRequireDefault(_Video);
	
	var _LazyLoadImg = __webpack_require__(5);
	
	var _LazyLoadImg2 = _interopRequireDefault(_LazyLoadImg);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var viewports = new _Viewports2.default({
	    'mobile': 685,
	    'tablet': 686,
	    'desktop': 992
	});
	//only start the kixer on mobile device
	if (viewports.isMobile()) {
	    var video = new _Video2.default();
	    video.initScroll();
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Viewports = function () {
	    function Viewports(viewports) {
	        _classCallCheck(this, Viewports);
	
	        this.winW = window.innerWidth;
	        this.winH = window.innerHeight;
	        this.viewPorts = viewports;
	    }
	
	    //setter for winW
	
	
	    _createClass(Viewports, [{
	        key: 'setWinW',
	        value: function setWinW(w) {
	            this.winW = w;
	        }
	
	        //getter for winW
	
	    }, {
	        key: 'getWinW',
	        value: function getWinW() {
	            return this.winW;
	        }
	
	        //setter for winH
	
	    }, {
	        key: 'setWinH',
	        value: function setWinH(h) {
	            this.winH = h;
	        }
	
	        //getter for winH
	
	    }, {
	        key: 'getWinH',
	        value: function getWinH() {
	            return this.winH;
	        }
	    }, {
	        key: 'isIPad',
	        value: function isIPad() {
	            return navigator.userAgent.match(/iPad/i);
	        }
	    }, {
	        key: 'isMobile',
	        value: function isMobile() {
	            return navigator.userAgent.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i);
	        }
	    }, {
	        key: 'isTouch',
	        value: function isTouch() {
	            return navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
	        }
	    }, {
	        key: 'getViewPort',
	        value: function getViewPort() {
	
	            var winW = this.winW;
	
	            return winW <= this.viewPorts.mobile ? 'mobile' : winW >= this.viewPorts.desktop ? 'desktop' : 'tablet';
	        }
	
	        /**
	         * @desc checking element is in view. This function works well to determine if the element is in view,
	         * but it takes a little time to do the calculation to get top, bottom, left and right positions
	         * @param object el
	         * @return bool - true or false
	         */
	
	    }, {
	        key: 'isElmInViewport',
	        value: function isElmInViewport(el) {
	
	            var rect = el.getBoundingClientRect();
	
	            return rect && rect.top >= 0 && rect.left >= 0 && rect.bottom <= this.winH && rect.right <= this.winW;
	        }
	
	        /**
	         * @desc checking element top postion is passing . This function works faster than the above isElmInViewport ,
	         * since we only need to check elment top position. This should be good to use if we just want to check the scroll
	         * position and doing pinning or lazyloading the scripts
	         * @param dom object el
	         * @param Number offet: passing an offet here if we want the scroll event rendered a bit early
	         * @return bool - true or false
	         */
	
	    }, {
	        key: 'isElmTopPosPassing',
	        value: function isElmTopPosPassing(el, offet) {
	
	            var rect = el.getBoundingClientRect();
	            var checkPos = undefined;
	
	            if (offet !== undefined && !isNaN(offet)) {
	                checkPos = rect.top - offet;
	            } else {
	                checkPos = rect.top;
	            }
	
	            return checkPos <= this.winH;
	        }
	    }]);
	
	    return Viewports;
	}();
	
	exports.default = Viewports;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * video lazy-loads video app on mobile
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _Viewports = __webpack_require__(1);
	
	var _Viewports2 = _interopRequireDefault(_Viewports);
	
	var _ScriptLoader = __webpack_require__(3);
	
	var _ScriptLoader2 = _interopRequireDefault(_ScriptLoader);
	
	var _scrollEvent = __webpack_require__(4);
	
	var _scrollEvent2 = _interopRequireDefault(_scrollEvent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Video = function () {
	    function Video() {
	        _classCallCheck(this, Video);
	
	        this.videoScript = 'https://www.youtube.com/watch?v=wv6sxLG-eXE';
	        this.kxSlot = { 'id': 5142, "domId": document.getElementById("__kx_ad_5142") };;
	        this.scriptLoaded = false;
	        this.videoRendered = false;
	    }
	
	    //getter for scriptLoaded
	
	
	    _createClass(Video, [{
	        key: "isScriptLoaded",
	        value: function isScriptLoaded() {
	            return this.scriptLoaded;
	        }
	
	        //setter for scriptLoaded
	
	    }, {
	        key: "setScriptLoaded",
	        value: function setScriptLoaded(value) {
	            this.scriptLoaded = value;
	        }
	
	        //getter for videoRendered
	
	    }, {
	        key: "isKixerRendered",
	        value: function isKixerRendered() {
	            return this.videoRendered;
	        }
	
	        //setter for videoRendered
	
	    }, {
	        key: "setKixerRendered",
	        value: function setKixerRendered(value) {
	            this.videoRendered = value;
	        }
	    }, {
	        key: "getKixerScript",
	        value: function getKixerScript() {
	            return this.videoScript;
	        }
	    }, {
	        key: "getKixerSlot",
	        value: function getKixerSlot() {
	            return this.kxSlot;
	        }
	
	        //start video event
	
	    }, {
	        key: "startKixerEvent",
	        value: function startKixerEvent() {
	
	            window.__kx_ad_slots = window.__kx_ad_slots || []; //instruction from Kixer team, __kx_ad_slots needs to be a global object
	            __kx_ad_slots.push(this.kxSlot.id);
	            if (typeof __kx_ad_start == 'function') {
	                __kx_ad_start();
	                this.setKixerRendered(true);
	            }
	        }
	
	        //get Kixer JS and render video widget
	
	    }, {
	        key: "renderKixer",
	        value: function renderKixer() {
	
	            //check if video JS is not loaded to ensure the following block code runs only once
	            if (!this.isScriptLoaded()) {
	                var scriptLoader = new _ScriptLoader2.default();
	                //load the script asynchronously
	                scriptLoader && scriptLoader.getScript(this.videoScript, this.setScriptLoaded(true), true);
	            } else {
	                // If the script is loaded
	
	                // If the ad hasn't rendered and the script is ready
	                if (!this.isKixerRendered() && typeof __kx_ad_start == 'function') {
	                    this.startKixerEvent(); //start video and set video.videoRendered to equal to true
	                }
	            }
	        }
	
	        /**
	         * @desc check if el visibility is changed
	         * @param dom object el
	         * @param function callback
	         * @return function, callback is executed if the condition is met
	         */
	
	    }, {
	        key: "onVisibilityChange",
	        value: function onVisibilityChange(el, callback) {
	            var viewports = new _Viewports2.default();
	
	            return function () {
	                //instead of comparing el top position, we pass a 500px offset so that the video widget will be injected early;
	                //otherwise, users will scroll right pass the element and not see the video widget that is being Lazy loading on the page
	                var visible = viewports.isElmTopPosPassing(el, 1000);
	                if (visible) {
	                    if (typeof callback == 'function') {
	                        callback();
	                    }
	                }
	            };
	        }
	
	        //throttle scrolling event to improve performance
	
	    }, {
	        key: "throttle",
	        value: function throttle(callback, wait) {
	            var time,
	                go = true;
	            return function () {
	                if (go) {
	                    go = false;
	                    time = setTimeout(function () {
	                        time = null;
	                        go = true;
	                        callback.call();
	                    }, wait);
	                }
	            };
	        }
	    }, {
	        key: "onScroll",
	        value: function onScroll(scrollHandler) {
	            var _this = this,
	                _arguments = arguments;
	
	            window.addEventListener("scroll", function () {
	                scrollHandler();
	                var isKixerRendered = _this.isKixerRendered();
	                //remove the scroll event after Kixer is rendered
	                if (isKixerRendered) {
	                    _this.removeEventListener('scroll', _arguments.callee);
	                }
	            });
	        }
	
	        /**
	         * @desc init function that runs onScroll event to lazy-load video script and widget
	         * OnScroll event will be canceled once video widget is rendered
	         * @return undefined
	         */
	
	    }, {
	        key: "initScroll",
	        value: function initScroll() {
	            /*
	             @scrollHandler returns a handler that runs throttle function. We pass a callback function
	             onVisibilityChange and 100ms delay scroll within throttle. onVisibilityChange function checks
	             if kxSlot.domId is near the top of window. if kxSlot.domId top position is 500px before the window top
	             position, that.renderKixer callback function will run
	             */
	
	            var scrollHandler = _scrollEvent2.default.throttle(this.onVisibilityChange(this.kxSlot.domId, this.renderKixer.bind(this)), 100);
	
	            this.onScroll(scrollHandler);
	        }
	    }]);
	
	    return Video;
	}();
	
	exports.default = Video;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ScriptLoader = function () {
		function ScriptLoader() {
			_classCallCheck(this, ScriptLoader);
	
			this.elPassingTopPos = false;
		}
	
		//get browser base url
	
	
		_createClass(ScriptLoader, [{
			key: 'getBaseurl',
			value: function getBaseurl() {
				var loc = location;
				return loc.origin || loc.protocol + '//' + loc.hostname + (loc.port ? ':' + loc.port : '');
			}
	
			/**
	   * @desc inject scripts into DOM dynamically with sync or async and execute a callback after script is loaded
	   * @param string url
	   * @param function callback
	   * @param bool async - true or false
	   * @return undefined
	   */
	
		}, {
			key: 'getScript',
			value: function getScript(url, callback, async) {
	
				// Create a new script and setup the basics.
				var script = document.createElement("script");
				var firstScript = document.getElementsByTagName('script')[0];
	
				//if the third argument is passed, load the script asynchronously; otherwise load it synchronously
				if (async === undefined && async !== false) {
					script.async = true;
				} else {
					script.async = false;
				}
	
				script.src = url;
	
				// Handle the case where an optional callback was passed in.
				if ("function" === typeof callback) {
					script.onload = function () {
	
						callback();
	
						// Clear it out to avoid getting called more than once or any memory leaks.
						script.onload = script.onreadystatechange = undefined;
					};
	
					script.onreadystatechange = function () {
						if ("loaded" === script.readyState || "complete" === script.readyState) {
							script.onload();
						}
					};
				}
	
				//Attach the script tag to the page (before the first script) so the magic can happen.
				return firstScript.parentNode.insertBefore(script, firstScript);
			}
		}]);
	
		return ScriptLoader;
	}();
	
	exports.default = ScriptLoader;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var scrollEvent = {
	    //throttle scrolling event to improve performance
	    //throttle scrolling event to improve performance
	    throttle: function throttle(callback, wait) {
	        var time,
	            go = true;
	        return function () {
	            if (go) {
	                go = false;
	                time = setTimeout(function () {
	                    time = null;
	                    go = true;
	                    callback.call();
	                }, wait);
	            }
	        };
	    }
	};
	
	exports.default = scrollEvent;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LazyLoadImg = function () {
	    function LazyLoadImg() {
	        _classCallCheck(this, LazyLoadImg);
	
	        this.handlr = undefined;
	    }
	
	    _createClass(LazyLoadImg, [{
	        key: 'loadImage',
	        value: function loadImage(el) {
	            var srcset = el.getAttribute('lazy-srcset');
	            if (el !== 'undefined') {
	                el.setAttribute('srcset', srcset);
	                el.removeAttribute("lazy-srcset");
	            }
	        }
	
	        /**
	         * this function checks if the image is in viewport and returns true false accordingly
	         * @param el element in question
	         * @returns {boolean} true if in viewport, false otherwise
	         */
	
	    }, {
	        key: 'elementInViewport',
	        value: function elementInViewport(el) {
	            var rect = el.getBoundingClientRect();
	            return rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
	        }
	
	        /**
	         * This function is called on every scroll and it determines if the image is in viewport and if yes, then we load the image
	         */
	
	    }, {
	        key: 'processScroll',
	        value: function processScroll() {
	            var images = this.getImages();
	            var len = images.length;
	            for (var i = 0; i < len; i++) {
	                if (this.elementInViewport(images[i])) {
	                    this.loadImage(images[i]);
	                }
	            }
	            if (images.length === 0) {
	                this.deinit();
	            }
	        }
	
	        /**
	         * Returns the images as an array set in the page
	         * @param that
	         * @returns {Array}
	         */
	
	    }, {
	        key: 'getImages',
	        value: function getImages() {
	            var qry = document.querySelectorAll('#main img[lazy-srcset]');
	            var images = new Array();
	            for (var i = 0, l = qry.length; i < l; i++) {
	                images.push(qry[i]);
	            }
	            return images;
	        }
	
	        /**q
	         * Init function which triggers the load of lazyLoad Script on Document Load.
	         */
	
	    }, {
	        key: 'init',
	        value: function init() {
	            var _this = this;
	
	            this.handlr = function () {
	                return _this.processScroll();
	            };
	            window.addEventListener('scroll', this.handlr, false);
	            window.addEventListener('load', this.handlr, false);
	        }
	
	        /**
	         * deInit function which removes all the listeners from the page
	         */
	
	    }, {
	        key: 'deinit',
	        value: function deinit() {
	            window.removeEventListener('scroll', this.handlr, false);
	            window.removeEventListener('load', this.handlr, false);
	        }
	    }]);
	
	    return LazyLoadImg;
	}();
	
	exports.default = LazyLoadImg;

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map