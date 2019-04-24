/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./database/database.js":
/*!******************************!*\
  !*** ./database/database.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../src/config/twilio.js */ \"./src/config/twilio.js\"),\n    accountSid = _require.accountSid,\n    authToken = _require.authToken;\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar moment = __webpack_require__(/*! moment */ \"moment\");\n\nvar Twilio = __webpack_require__(/*! twilio */ \"twilio\");\n\nmongoose.Promise = global.Promise;\nmongoose.connect(\"mongodb://localhost:27017/to-do-app-original\", {\n  useNewUrlParser: true\n}); //creating the database\n\nvar nameSchema = mongoose.Schema({\n  task: String,\n  number: String,\n  notification: Number,\n  time: {\n    type: Date,\n    index: true\n  }\n}, {\n  versionKey: false\n});\n\nnameSchema.methods.requiresNotification = function (date) {\n  var taskDueTime = moment(this.time).tz(\"America/Los_Angeles\").format('LLL');\n  var currentTime = moment(date).tz(\"America/Los_Angeles\").format('LLL');\n  console.log('*database entry time*\\n', taskDueTime);\n  console.log('*current time*\\n', currentTime);\n  console.log('*difference in time\\n', Math.round(moment.duration(moment(this.time).tz(\"America/Los_Angeles\").utc().diff(moment(date).tz(\"America/Los_Angeles\").utc())).asMinutes()));\n  var minutesBeforeText = 0; // Return difference of taskeDueTime and currentTime is equal to minutesBeforeText\n\n  return Math.round(moment.duration(moment(this.time).tz(\"America/Los_Angeles\").utc().diff(moment(date).tz(\"America/Los_Angeles\").utc())).asMinutes()) === minutesBeforeText;\n};\n\nnameSchema.statics.sendNotifications = function (callback) {\n  // now\n  var searchDate = new Date();\n  TaskDB.find().then(function (tasks) {\n    tasks = tasks.filter(function (task) {\n      return task.requiresNotification(searchDate);\n    });\n\n    if (tasks.length > 0) {\n      sendNotifications(tasks);\n    }\n  });\n\n  function sendNotifications(tasks) {\n    var client = new Twilio(accountSid, authToken);\n    tasks.forEach(function (task) {\n      // Create options to send the message\n      var options = {\n        to: \"+1\".concat(task.number),\n        from: '+15165634928',\n\n        /* eslint-disable max-len */\n        body: \"\".concat(task.task)\n        /* eslint-enable max-len */\n\n      };\n      console.log('THIS IS OPTIONS!', options); // Send the message!\n\n      client.messages.create(options, function (err, response) {\n        if (err) {\n          // Just log it for now\n          console.error(err);\n        } else {\n          // Log the last few digits of a phone number\n          var masked = task.number.substr(0, task.number.length - 5);\n          masked += '*****';\n          console.log(\"Message sent to \".concat(masked));\n        }\n      });\n    }); // Don't wait on success/failure, just indicate all messages have been\n    // queued for delivery\n\n    if (callback) {\n      callback.call();\n    }\n  }\n};\n\nvar TaskDB = mongoose.model(\"task\", nameSchema);\nmodule.exports = TaskDB;\n\n//# sourceURL=webpack:///./database/database.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _arrayWithoutHoles; });\nfunction _arrayWithoutHoles(arr) {\n  if (Array.isArray(arr)) {\n    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {\n      arr2[i] = arr[i];\n    }\n\n    return arr2;\n  }\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _assertThisInitialized; });\nfunction _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _classCallCheck; });\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _createClass; });\nfunction _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _getPrototypeOf; });\nfunction _getPrototypeOf(o) {\n  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _inherits; });\n/* harmony import */ var _setPrototypeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) Object(_setPrototypeOf__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(subClass, superClass);\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _iterableToArray; });\nfunction _iterableToArray(iter) {\n  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter);\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArray.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _nonIterableSpread; });\nfunction _nonIterableSpread() {\n  throw new TypeError(\"Invalid attempt to spread non-iterable instance\");\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _possibleConstructorReturn; });\n/* harmony import */ var _helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/esm/typeof */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js\");\n/* harmony import */ var _assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js\");\n\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (Object(_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return Object(_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(self);\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _setPrototypeOf; });\nfunction _setPrototypeOf(o, p) {\n  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _toConsumableArray; });\n/* harmony import */ var _arrayWithoutHoles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js\");\n/* harmony import */ var _iterableToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/iterableToArray.js\");\n/* harmony import */ var _nonIterableSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nonIterableSpread */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js\");\n\n\n\nfunction _toConsumableArray(arr) {\n  return Object(_arrayWithoutHoles__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(arr) || Object(_iterableToArray__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(arr) || Object(_nonIterableSpread__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _typeof; });\nfunction _typeof2(obj) {\n  if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") {\n    _typeof2 = function _typeof2(obj) {\n      return typeof obj;\n    };\n  } else {\n    _typeof2 = function _typeof2(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n    };\n  }\n\n  return _typeof2(obj);\n}\n\nfunction _typeof(obj) {\n  if (typeof Symbol === \"function\" && _typeof2(Symbol.iterator) === \"symbol\") {\n    _typeof = function _typeof(obj) {\n      return _typeof2(obj);\n    };\n  } else {\n    _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : _typeof2(obj);\n    };\n  }\n\n  return _typeof(obj);\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./src/App.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./src/App.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\")(false);\n// Module\nexports.push([module.i, \"body {\\n  background-color: white;\\n}\\n\\nh1{\\n  display: inline-block;\\n  vertical-align: middle;\\n  line-height: normal;\\n  font-size: 3rem;\\n}\\n\\n#submit-button {\\n  color: white;\\n  background-color: lightseagreen;\\n  display: inline-block;\\n}\\n\\n#task-container {\\n  margin: 0 auto;\\n  display: flex;\\n}\\n\\n.title-container{\\n  line-height: 300px;\\n  margin: 0;\\n  height: 350px;\\n  background-repeat:no-repeat;\\n  background-position: center center;\\n  background-size: cover;\\n  background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,0.4724264705882353) 100%);\\n}\\n\\n#task-form{\\n  display: flex;\\n  justify-content: center;\\n}\\n\\nli{\\n  font-size: 1.5rem;\\n  padding-top: 20px;\\n}\\n\\n.userTask{\\n  text-align: left;\\n}\", \"\"]);\n\n\n\n//# sourceURL=webpack:///./src/App.css?./node_modules/css-loader/dist/cjs.js??ref--5-1");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return '@media ' + item[2] + '{' + content + '}';\n      } else {\n        return content;\n      }\n    }).join('');\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/isomorphic-style-loader/insertCss.js":
/*!***********************************************************!*\
  !*** ./node_modules/isomorphic-style-loader/insertCss.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */\n\n\n\nvar inserted = {};\n\nfunction b64EncodeUnicode(str) {\n  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {\n    return String.fromCharCode(\"0x\" + p1);\n  }));\n}\n\nfunction removeCss(ids) {\n  ids.forEach(function (id) {\n    if (--inserted[id] <= 0) {\n      var elem = document.getElementById(id);\n\n      if (elem) {\n        elem.parentNode.removeChild(elem);\n      }\n    }\n  });\n}\n\nfunction insertCss(styles, _temp) {\n  var _ref = _temp === void 0 ? {} : _temp,\n      _ref$replace = _ref.replace,\n      replace = _ref$replace === void 0 ? false : _ref$replace,\n      _ref$prepend = _ref.prepend,\n      prepend = _ref$prepend === void 0 ? false : _ref$prepend,\n      _ref$prefix = _ref.prefix,\n      prefix = _ref$prefix === void 0 ? 's' : _ref$prefix;\n\n  var ids = [];\n\n  for (var i = 0; i < styles.length; i++) {\n    var _styles$i = styles[i],\n        moduleId = _styles$i[0],\n        css = _styles$i[1],\n        media = _styles$i[2],\n        sourceMap = _styles$i[3];\n    var id = \"\" + prefix + moduleId + \"-\" + i;\n    ids.push(id);\n\n    if (inserted[id]) {\n      if (!replace) {\n        inserted[id]++;\n        continue;\n      }\n    }\n\n    inserted[id] = 1;\n    var elem = document.getElementById(id);\n    var create = false;\n\n    if (!elem) {\n      create = true;\n      elem = document.createElement('style');\n      elem.setAttribute('type', 'text/css');\n      elem.id = id;\n\n      if (media) {\n        elem.setAttribute('media', media);\n      }\n    }\n\n    var cssText = css;\n\n    if (sourceMap && typeof btoa === 'function') {\n      cssText += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + b64EncodeUnicode(JSON.stringify(sourceMap)) + \"*/\";\n      cssText += \"\\n/*# sourceURL=\" + sourceMap.file + \"?\" + id + \"*/\";\n    }\n\n    if ('textContent' in elem) {\n      elem.textContent = cssText;\n    } else {\n      elem.styleSheet.cssText = cssText;\n    }\n\n    if (create) {\n      if (prepend) {\n        document.head.insertBefore(elem, document.head.childNodes[0]);\n      } else {\n        document.head.appendChild(elem);\n      }\n    }\n  }\n\n  return removeCss.bind(null, ids);\n}\n\nmodule.exports = insertCss;\n//# sourceMappingURL=insertCss.js.map\n\n\n//# sourceURL=webpack:///./node_modules/isomorphic-style-loader/insertCss.js?");

/***/ }),

/***/ "./server/notificationsWorker.js":
/*!***************************************!*\
  !*** ./server/notificationsWorker.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var TaskDB = __webpack_require__(/*! ../database/database.js */ \"./database/database.js\");\n\nvar notificationWorkerFactory = function notificationWorkerFactory() {\n  return {\n    run: function run() {\n      TaskDB.sendNotifications();\n    }\n  };\n};\n\nmodule.exports = notificationWorkerFactory();\n\n//# sourceURL=webpack:///./server/notificationsWorker.js?");

/***/ }),

/***/ "./server/schedulerFactory.js":
/*!************************************!*\
  !*** ./server/schedulerFactory.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var CronJob = __webpack_require__(/*! cron */ \"cron\").CronJob;\n\nvar notificationWorkerFactory = __webpack_require__(/*! ./notificationsWorker */ \"./server/notificationsWorker.js\");\n\nvar moment = __webpack_require__(/*! moment */ \"moment\");\n\nvar schedulerFactory = function schedulerFactory() {\n  return {\n    start: function start() {\n      new CronJob('00 * * * * *', function () {\n        console.log('Running Send Notifications Worker for ' + moment().format());\n        notificationWorkerFactory.run();\n      }, null, true, '');\n    }\n  };\n};\n\nmodule.exports = schedulerFactory();\n\n//# sourceURL=webpack:///./server/schedulerFactory.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_stephanie_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _src_App_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/App.js */ \"./src/App.js\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! isomorphic-style-loader/StyleContext */ \"isomorphic-style-loader/StyleContext\");\n/* harmony import */ var isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var jss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jss */ \"jss\");\n/* harmony import */ var jss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jss__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var react_jss_lib_JssProvider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-jss/lib/JssProvider */ \"react-jss/lib/JssProvider\");\n/* harmony import */ var react_jss_lib_JssProvider__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jss_lib_JssProvider__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/styles */ \"@material-ui/core/styles\");\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/colors/green */ \"@material-ui/core/colors/green\");\n/* harmony import */ var _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _material_ui_core_colors_red__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/colors/red */ \"@material-ui/core/colors/red\");\n/* harmony import */ var _material_ui_core_colors_red__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_red__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _material_ui_core_colors_yellow__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/colors/yellow */ \"@material-ui/core/colors/yellow\");\n/* harmony import */ var _material_ui_core_colors_yellow__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_yellow__WEBPACK_IMPORTED_MODULE_10__);\n\nvar _jsxFileName = \"/home/stephanie/Documents/Programming_Materials/Chingu/geckos-project-10/to-do-app original/server/server.js\";\n\n\n\n\n\n\n\n\n\n\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar app = express();\n\nvar methodOverride = __webpack_require__(/*! method-override */ \"method-override\");\n\nvar http = __webpack_require__(/*! http */ \"http\");\n\nvar cron = __webpack_require__(/*! node-cron */ \"node-cron\");\n\nvar TaskDB = __webpack_require__(/*! ../database/database.js */ \"./database/database.js\");\n\nvar schedulerFactory = __webpack_require__(/*! ./schedulerFactory.js */ \"./server/schedulerFactory.js\"); // const accountSid = 'AC019a30196451142d27d879a8f687f3cc';\n// const authToken = '978f64b17f1149a06b5f1a84c6fe1bf4';\n// const MessagingResponse = require('twilio').twiml.MessagingResponse;\n\n\napp.use(methodOverride(\"_method\"));\napp.use(bodyParser.json()); // to support JSON-encoded bodies\n\napp.use(bodyParser.urlencoded({\n  // to support URL-encoded bodies\n  extended: true\n}));\napp.get(\"/\", function (req, res) {\n  //grabs from DB\n  // console.log('this is a GET request')\n  var tasks;\n  TaskDB.find({}).exec().then(function (data) {\n    tasks = data; // console.log(\"THIS IS TASKS********\",tasks);\n  }).then(function () {\n    var css = new Set(); // CSS for all rendered React components\n\n    var insertCss = function insertCss() {\n      for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {\n        styles[_key] = arguments[_key];\n      }\n\n      return styles.forEach(function (style) {\n        return css.add(style._getCss());\n      });\n    }; // Create a sheetsRegistry instance.\n\n\n    var sheetsRegistry = new jss__WEBPACK_IMPORTED_MODULE_5__[\"SheetsRegistry\"](); // Create a sheetsManager instance.\n\n    var sheetsManager = new Map(); // Create a theme instance.\n\n    var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__[\"createMuiTheme\"])({\n      palette: {\n        primary: _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_8___default.a,\n        secondary: _material_ui_core_colors_yellow__WEBPACK_IMPORTED_MODULE_10___default.a,\n        type: \"light\"\n      }\n    }); // Create a new class name generator.\n\n    var generateClassName = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__[\"createGenerateClassName\"])();\n    var appString = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_3__[\"renderToString\"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_jss_lib_JssProvider__WEBPACK_IMPORTED_MODULE_6___default.a, {\n      registry: sheetsRegistry,\n      generateClassName: generateClassName,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 73\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_7__[\"MuiThemeProvider\"], {\n      theme: theme,\n      sheetsManager: sheetsManager,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 77\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_4___default.a.Provider, {\n      value: {\n        insertCss: insertCss\n      },\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 78\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_src_App_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n      tasks: tasks,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 79\n      },\n      __self: this\n    })))));\n    var css1 = sheetsRegistry.toString();\n    console.log(\"****css****\\n\", css, \"\\n\"); // console.log('****CSS1****\\n', css1)\n\n    var indexFile = \"\\n    <!DOCTYPE html>\\n    <html lang=\\\"en\\\">\\n      <head>\\n        <meta charset=\\\"utf-8\\\">\\n        <link rel=\\\"shortcut icon\\\" href=\\\"%PUBLIC_URL%/favicon.ico\\\">\\n        <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1, shrink-to-fit=no\\\">\\n        <meta name=\\\"theme-color\\\" content=\\\"#000000\\\">\\n        <style>\".concat(Object(_home_stephanie_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(css).join(\"\")).concat(css1, \"</style>\\n        <title>React App</title>\\n      </head>\\n      <body>\\n        <noscript>\\n          You need to enable JavaScript to run this app.\\n        </noscript>\\n        <div id=\\\"root\\\">\").concat(appString, \"</div>\\n\\n      </body>\\n    </html>\\n  \");\n    res.status(200).send(indexFile);\n  }).catch(function (err) {\n    console.log(err, \"THIS IS A GET PROMISE ERROR\");\n  });\n});\napp.post(\"/tasks\", function (req, res) {\n  //database endpoint; submits data from user input\n  // let tasks;\n  console.log(req.body, \"*******\");\n  console.log(req.params, \"*******\");\n  TaskDB.create(req.body, function (err, result) {\n    if (err) {\n      console.log(\"ERROR IN CREATE \", err);\n    }\n\n    console.log(\"CREATE SUCCESS \", result);\n  }); //   TaskDB.find({})\n  //     .exec()\n  //     .then(data => {\n  //       // console.log('THIS IS DATA*******', data)\n  //       tasks = data;\n  //       console.log(\"THIS IS TASKS******\", tasks);\n  //     })\n  //     .then(() => {\n  //       const css = new Set(); // CSS for all rendered React components\n  //       const insertCss = (...styles) =>\n  //         styles.forEach(style => css.add(style._getCss()));\n  //       // Create a sheetsRegistry instance.\n  //       const sheetsRegistry = new SheetsRegistry();\n  //       // Create a sheetsManager instance.\n  //       const sheetsManager = new Map();\n  //       // Create a theme instance.\n  //       const theme = createMuiTheme({\n  //         palette: {\n  //           primary: green,\n  //           accent: red,\n  //           type: \"light\"\n  //         }\n  //       });\n  //       // Create a new class name generator.\n  //       const generateClassName = createGenerateClassName();\n  //       const appString = renderToString(\n  //         <JssProvider\n  //           registry={sheetsRegistry}\n  //           generateClassName={generateClassName}\n  //         >\n  //           <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>\n  //             <StyleContext.Provider value={{ insertCss }}>\n  //               <App tasks={tasks} />\n  //             </StyleContext.Provider>\n  //           </MuiThemeProvider>\n  //         </JssProvider>\n  //       );\n  //       const css1 = sheetsRegistry.toString();\n  //       console.log(\"****css****\\n\", css, \"\\n\");\n  //       // console.log('****CSS1****\\n', css1)\n  //       const indexFile = `\n  //   <!DOCTYPE html>\n  //   <html lang=\"en\">\n  //     <head>\n  //       <meta charset=\"utf-8\">\n  //       <link rel=\"shortcut icon\" href=\"%PUBLIC_URL%/favicon.ico\">\n  //       <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n  //       <meta name=\"theme-color\" content=\"#000000\">\n  //       <style>${[...css].join(\"\")}${css1}</style>\n  //       <title>React App</title>\n  //     </head>\n  //     <body>\n  //       <noscript>\n  //         You need to enable JavaScript to run this app.\n  //       </noscript>\n  //       <div id=\"root\">${appString}</div>\n  //     </body>\n  //   </html>\n  // `;\n\n  res.status(200).redirect(\"/\"); // })\n  // .catch(err => {\n  //   console.log(err, \"THIS IS A POST PROMISE ERROR\");\n  // });\n  // });\n});\napp.delete(\"/tasks/:id\", function (req, res) {\n  console.log(\"DELETE REQUEST WORKING\");\n  console.log(req.params); // let tasks;\n\n  TaskDB.findByIdAndRemove({\n    _id: req.params.id\n  }, function (err, data) {\n    if (err) {\n      console.log(\"DELETE REQUEST ERROR\");\n    }\n  }); //   TaskDB.find({})\n  //     .exec()\n  //     .then(data => {\n  //       console.log(data);\n  //       tasks = data;\n  //     })\n  //     .then(() => {\n  //       const css = new Set(); // CSS for all rendered React components\n  //       const insertCss = (...styles) =>\n  //         styles.forEach(style => css.add(style._getCss()));\n  //       // Create a sheetsRegistry instance.\n  //       const sheetsRegistry = new SheetsRegistry();\n  //       // Create a sheetsManager instance.\n  //       const sheetsManager = new Map();\n  //       // Create a theme instance.\n  //       const theme = createMuiTheme({\n  //         palette: {\n  //           primary: green,\n  //           accent: red,\n  //           type: \"light\"\n  //         }\n  //       });\n  //       // Create a new class name generator.\n  //       const generateClassName = createGenerateClassName();\n  //       const appString = renderToString(\n  //         <JssProvider\n  //           registry={sheetsRegistry}\n  //           generateClassName={generateClassName}\n  //         >\n  //           <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>\n  //             <StyleContext.Provider value={{ insertCss }}>\n  //               <App tasks={tasks} />\n  //             </StyleContext.Provider>\n  //           </MuiThemeProvider>\n  //         </JssProvider>\n  //       );\n  //       const css1 = sheetsRegistry.toString();\n  //       console.log(\"****css****\\n\", css, \"\\n\");\n  //       // console.log('****CSS1****\\n', css1)\n  //       const indexFile = `\n  //   <!DOCTYPE html>\n  //   <html lang=\"en\">\n  //     <head>\n  //       <meta charset=\"utf-8\">\n  //       <link rel=\"shortcut icon\" href=\"%PUBLIC_URL%/favicon.ico\">\n  //       <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n  //       <meta name=\"theme-color\" content=\"#000000\">\n  //       <style>${[...css].join(\"\")}${css1}</style>\n  //       <title>React App</title>\n  //     </head>\n  //     <body>\n  //       <noscript>\n  //         You need to enable JavaScript to run this app.\n  //       </noscript>\n  //       <div id=\"root\">${appString}</div>\n  //     </body>\n  //   </html>\n  // `;\n\n  res.status(200).redirect(\"/\"); // })\n  // .catch(err => {\n  //   console.log(err, \"THIS IS A DELETE PROMISE ERROR\");\n  // });\n  // });\n});\nschedulerFactory.start();\napp.listen(8080);\nconsole.log(\"Node server running on port 8080\"); // module.exports = schedulerFactory();\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ "./src/Alert.js":
/*!**********************!*\
  !*** ./src/Alert.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _jsxFileName = \"/home/stephanie/Documents/Programming_Materials/Chingu/geckos-project-10/to-do-app original/src/Alert.js\";\n\n\nvar Alert = function Alert(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 6\n    },\n    __self: this\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    name: \"alert-time\",\n    type: \"time\",\n    onChange: props.onChange,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 7\n    },\n    __self: this\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Alert);\n\n//# sourceURL=webpack:///./src/Alert.js?");

/***/ }),

/***/ "./src/App.css":
/*!*********************!*\
  !*** ./src/App.css ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n    var refs = 0;\n    var css = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--5-1!./App.css */ \"./node_modules/css-loader/dist/cjs.js?!./src/App.css\");\n    var insertCss = __webpack_require__(/*! ../node_modules/isomorphic-style-loader/insertCss.js */ \"./node_modules/isomorphic-style-loader/insertCss.js\");\n    var content = typeof css === 'string' ? [[module.i, css, '']] : css;\n\n    exports = module.exports = css.locals || {};\n    exports._getContent = function() { return content; };\n    exports._getCss = function() { return '' + css; };\n    exports._insertCss = function(options) { return insertCss(content, options) };\n\n    // Hot Module Replacement\n    // https://webpack.github.io/docs/hot-module-replacement\n    // Only activated in browser context\n    if (false) { var removeCss; }\n  \n\n//# sourceURL=webpack:///./src/App.css?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_stephanie_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _home_stephanie_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _home_stephanie_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js\");\n/* harmony import */ var _home_stephanie_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var _home_stephanie_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _Form_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Form.js */ \"./src/Form.js\");\n/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Task.js */ \"./src/Task.js\");\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./App.css */ \"./src/App.css\");\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _Title_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Title.js */ \"./src/Title.js\");\n/* harmony import */ var isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! isomorphic-style-loader/withStyles */ \"isomorphic-style-loader/withStyles\");\n/* harmony import */ var isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_10__);\n\n\n\n\n\nvar _jsxFileName = \"/home/stephanie/Documents/Programming_Materials/Chingu/geckos-project-10/to-do-app original/src/App.js\";\n\n\n\n\n\n\nvar mainDiv = {\n  textAlign: \"center\"\n};\n\nvar App =\n/*#__PURE__*/\nfunction (_Component) {\n  Object(_home_stephanie_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(App, _Component);\n\n  function App(props) {\n    var _this;\n\n    Object(_home_stephanie_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, App);\n\n    _this = Object(_home_stephanie_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, Object(_home_stephanie_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(App).call(this, props));\n    _this.state = {\n      tasks: _this.props.tasks\n    };\n    return _this;\n  }\n\n  Object(_home_stephanie_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(App, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        style: mainDiv,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 22\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Title_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 25\n        },\n        __self: this\n      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Form_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 26\n        },\n        __self: this\n      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Task_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n        tasks: this.state.tasks,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 27\n        },\n        __self: this\n      }));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_10___default()(_App_css__WEBPACK_IMPORTED_MODULE_8___default.a)(App)); // export default App;\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/Form.js":
/*!*********************!*\
  !*** ./src/Form.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Alert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Alert.js */ \"./src/Alert.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Button */ \"@material-ui/core/Button\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/TextField */ \"@material-ui/core/TextField\");\n/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4__);\nvar _jsxFileName = \"/home/stephanie/Documents/Programming_Materials/Chingu/geckos-project-10/to-do-app original/src/Form.js\";\n\n\n\n\n // export default class Form extends React.Component { //stateful component\n\nvar Form = function Form(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    id: \"task-form\",\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 11\n    },\n    __self: this\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n    method: \"POST\",\n    action: \"/tasks\",\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 12\n    },\n    __self: this\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    required: true,\n    className: \"\",\n    margin: \"normal\",\n    variant: \"outlined\",\n    name: \"task\",\n    type: \"text\",\n    placeholder: \"Type your task\",\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 13\n    },\n    __self: this\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    required: true // label=\"Required\"\n    ,\n    margin: \"normal\",\n    variant: \"outlined\",\n    name: \"time\",\n    type: \"datetime-local\" // onChange={props.time}\n    ,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 22\n    },\n    __self: this\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    required: true,\n    name: \"number\",\n    type: \"text\" // onChange={props.number}\n    ,\n    placeholder: \"Type your number\",\n    margin: \"normal\",\n    variant: \"outlined\",\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 31\n    },\n    __self: this\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 40\n    },\n    __self: this\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    id: \"submit-button\",\n    type: \"submit\",\n    variant: \"contained\",\n    color: \"primary\",\n    margin: \"normal\",\n    size: \"large\",\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 41\n    },\n    __self: this\n  }, \"Submit\")));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Form); // render(){\n//     return (\n// <div>\n// <form>\n//     <input name=\"task\" type=\"text\" value={this.props.input} onChange = {this.handleChangeInput}  placeholder=\"Type your task\" /><br></br>\n//     {/* how to access 'name' from input tag? */}\n//     <Alert />\n//     <button onClick={this.handleClick} >Submit</button>\n// </form>\n//  <Task item={this.props.form} />\n// </div>\n//     )\n// }\n// }\n\n//# sourceURL=webpack:///./src/Form.js?");

/***/ }),

/***/ "./src/Task.js":
/*!*********************!*\
  !*** ./src/Task.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Button */ \"@material-ui/core/Button\");\n/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__);\nvar _jsxFileName = \"/home/stephanie/Documents/Programming_Materials/Chingu/geckos-project-10/to-do-app original/src/Task.js\";\n\n\n\nvar Task = function Task(props) {\n  // {\n  //   var key = 0;\n  // }\n  // console.log('THIS IS PROPS', props.tasks)\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 12\n    },\n    __self: this\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ol\", {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 13\n    },\n    __self: this\n  }, props.tasks.map(function (entry) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      id: \"task-container\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 16\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 17\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n      method: \"POST\",\n      action: \"/tasks/\".concat(entry._id, \"?_method=DELETE\"),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 18\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n      className: \"userTask\",\n      key: entry._id,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 22\n      },\n      __self: this\n    }, entry.task, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default.a, {\n      type: \"submit\",\n      variant: \"contained\",\n      color: \"secondary\",\n      size: \"small\",\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 24\n      },\n      __self: this\n    }, \"x\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 32\n      },\n      __self: this\n    }), entry.time.toString().split(\"G\")[0]))));\n  })));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Task);\n\n//# sourceURL=webpack:///./src/Task.js?");

/***/ }),

/***/ "./src/Title.js":
/*!**********************!*\
  !*** ./src/Title.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\nvar _jsxFileName = \"/home/stephanie/Documents/Programming_Materials/Chingu/geckos-project-10/to-do-app original/src/Title.js\";\n\n\n\nvar Title = function Title(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"title-container\",\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 6\n    },\n    __self: this\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 7\n    },\n    __self: this\n  }, \"My To Do List\"));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Title);\n\n//# sourceURL=webpack:///./src/Title.js?");

/***/ }),

/***/ "./src/config/twilio.js":
/*!******************************!*\
  !*** ./src/config/twilio.js ***!
  \******************************/
/*! exports provided: accountSid, authToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"accountSid\", function() { return accountSid; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"authToken\", function() { return authToken; });\nvar accountSid = 'AC019a30196451142d27d879a8f687f3cc';\nvar authToken = '978f64b17f1149a06b5f1a84c6fe1bf4';\n\n//# sourceURL=webpack:///./src/config/twilio.js?");

/***/ }),

/***/ "@material-ui/core/Button":
/*!*******************************************!*\
  !*** external "@material-ui/core/Button" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@material-ui/core/Button\");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/Button%22?");

/***/ }),

/***/ "@material-ui/core/TextField":
/*!**********************************************!*\
  !*** external "@material-ui/core/TextField" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@material-ui/core/TextField\");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/TextField%22?");

/***/ }),

/***/ "@material-ui/core/colors/green":
/*!*************************************************!*\
  !*** external "@material-ui/core/colors/green" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@material-ui/core/colors/green\");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/colors/green%22?");

/***/ }),

/***/ "@material-ui/core/colors/red":
/*!***********************************************!*\
  !*** external "@material-ui/core/colors/red" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@material-ui/core/colors/red\");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/colors/red%22?");

/***/ }),

/***/ "@material-ui/core/colors/yellow":
/*!**************************************************!*\
  !*** external "@material-ui/core/colors/yellow" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@material-ui/core/colors/yellow\");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/colors/yellow%22?");

/***/ }),

/***/ "@material-ui/core/styles":
/*!*******************************************!*\
  !*** external "@material-ui/core/styles" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@material-ui/core/styles\");\n\n//# sourceURL=webpack:///external_%22@material-ui/core/styles%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cron":
/*!***********************!*\
  !*** external "cron" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cron\");\n\n//# sourceURL=webpack:///external_%22cron%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "isomorphic-style-loader/StyleContext":
/*!*******************************************************!*\
  !*** external "isomorphic-style-loader/StyleContext" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"isomorphic-style-loader/StyleContext\");\n\n//# sourceURL=webpack:///external_%22isomorphic-style-loader/StyleContext%22?");

/***/ }),

/***/ "isomorphic-style-loader/withStyles":
/*!*****************************************************!*\
  !*** external "isomorphic-style-loader/withStyles" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"isomorphic-style-loader/withStyles\");\n\n//# sourceURL=webpack:///external_%22isomorphic-style-loader/withStyles%22?");

/***/ }),

/***/ "jss":
/*!**********************!*\
  !*** external "jss" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jss\");\n\n//# sourceURL=webpack:///external_%22jss%22?");

/***/ }),

/***/ "method-override":
/*!**********************************!*\
  !*** external "method-override" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"method-override\");\n\n//# sourceURL=webpack:///external_%22method-override%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "node-cron":
/*!****************************!*\
  !*** external "node-cron" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-cron\");\n\n//# sourceURL=webpack:///external_%22node-cron%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom\");\n\n//# sourceURL=webpack:///external_%22react-dom%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-jss/lib/JssProvider":
/*!********************************************!*\
  !*** external "react-jss/lib/JssProvider" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-jss/lib/JssProvider\");\n\n//# sourceURL=webpack:///external_%22react-jss/lib/JssProvider%22?");

/***/ }),

/***/ "twilio":
/*!*************************!*\
  !*** external "twilio" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"twilio\");\n\n//# sourceURL=webpack:///external_%22twilio%22?");

/***/ })

/******/ });