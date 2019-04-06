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

eval("var _require = __webpack_require__(/*! ../src/config/twilio.js */ \"./src/config/twilio.js\"),\n    accountSid = _require.accountSid,\n    authToken = _require.authToken;\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar moment = __webpack_require__(/*! moment */ \"moment\");\n\nvar Twilio = __webpack_require__(/*! twilio */ \"twilio\");\n\nmongoose.Promise = global.Promise;\nmongoose.connect(\"mongodb://localhost:27017/to-do-app-original\", {\n  useNewUrlParser: true\n}); //creating the database\n\nvar nameSchema = mongoose.Schema({\n  task: String,\n  number: String,\n  notification: Number,\n  time: {\n    type: Date,\n    index: true\n  }\n}, {\n  versionKey: false\n});\n\nnameSchema.methods.requiresNotification = function (date) {\n  var taskDueTime = moment(this.time).tz(\"America/Los_Angeles\").format('LLL');\n  var currentTime = moment(date).tz(\"America/Los_Angeles\").format('LLL');\n  console.log('*database entry time*\\n', taskDueTime);\n  console.log('*current time*\\n', currentTime);\n  console.log('*difference in time\\n', Math.round(moment.duration(moment(this.time).tz(\"America/Los_Angeles\").utc().diff(moment(date).tz(\"America/Los_Angeles\").utc())).asMinutes()));\n  var minutesBeforeText = 0; // Return difference of taskeDueTime and currentTime is equal to minutesBeforeText\n\n  return Math.round(moment.duration(moment(this.time).tz(\"America/Los_Angeles\").utc().diff(moment(date).tz(\"America/Los_Angeles\").utc())).asMinutes()) === minutesBeforeText;\n};\n\nnameSchema.statics.sendNotifications = function (callback) {\n  // now\n  var searchDate = new Date();\n  TaskDB.find().then(function (tasks) {\n    tasks = tasks.filter(function (task) {\n      return task.requiresNotification(searchDate);\n    });\n\n    if (tasks.length > 0) {\n      sendNotifications(tasks);\n    }\n  });\n\n  function sendNotifications(tasks) {\n    var client = new Twilio(accountSid, authToken);\n    tasks.forEach(function (task) {\n      // Create options to send the message\n      var options = {\n        to: \"+1\".concat(task.number),\n        from: '+15165634928',\n\n        /* eslint-disable max-len */\n        body: \"Hi. Just a reminder that you have an appointment coming up.\"\n        /* eslint-enable max-len */\n\n      };\n      console.log('THIS IS OPTIONS!', options); // Send the message!\n\n      client.messages.create(options, function (err, response) {\n        if (err) {\n          // Just log it for now\n          console.error(err);\n        } else {\n          // Log the last few digits of a phone number\n          var masked = task.number.substr(0, task.number.length - 5);\n          masked += '*****';\n          console.log(\"Message sent to \".concat(masked));\n        }\n      });\n    }); // Don't wait on success/failure, just indicate all messages have been\n    // queued for delivery\n\n    if (callback) {\n      callback.call();\n    }\n  }\n};\n\nvar TaskDB = mongoose.model(\"task\", nameSchema);\nmodule.exports = TaskDB;\n\n//# sourceURL=webpack:///./database/database.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _assertThisInitialized; });\nfunction _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _classCallCheck; });\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/esm/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _createClass; });\nfunction _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/esm/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _getPrototypeOf; });\nfunction _getPrototypeOf(o) {\n  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _inherits; });\n/* harmony import */ var _setPrototypeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) Object(_setPrototypeOf__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(subClass, superClass);\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/esm/inherits.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _possibleConstructorReturn; });\n/* harmony import */ var _helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/esm/typeof */ \"./node_modules/@babel/runtime/helpers/esm/typeof.js\");\n/* harmony import */ var _assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js\");\n\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (Object(_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return Object(_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(self);\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _setPrototypeOf; });\nfunction _setPrototypeOf(o, p) {\n  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _typeof; });\nfunction _typeof2(obj) {\n  if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") {\n    _typeof2 = function _typeof2(obj) {\n      return typeof obj;\n    };\n  } else {\n    _typeof2 = function _typeof2(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n    };\n  }\n\n  return _typeof2(obj);\n}\n\nfunction _typeof(obj) {\n  if (typeof Symbol === \"function\" && _typeof2(Symbol.iterator) === \"symbol\") {\n    _typeof = function _typeof(obj) {\n      return _typeof2(obj);\n    };\n  } else {\n    _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : _typeof2(obj);\n    };\n  }\n\n  return _typeof(obj);\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/esm/typeof.js?");

/***/ }),

/***/ "./public/App.css":
/*!************************!*\
  !*** ./public/App.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* .title {\n  font-size: 1000px;\n} */\n\n//# sourceURL=webpack:///./public/App.css?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_App_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/App.js */ \"./src/App.js\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/home/sjl/Documents/Programming Materials/Chingu/geckos-project-10/to-do-app original/server/server.js\";\n\n\n\n\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar app = express();\n\nvar methodOverride = __webpack_require__(/*! method-override */ \"method-override\");\n\nvar http = __webpack_require__(/*! http */ \"http\");\n\nvar cron = __webpack_require__(/*! node-cron */ \"node-cron\");\n\nvar TaskDB = __webpack_require__(/*! ../database/database.js */ \"./database/database.js\");\n\nvar schedulerFactory = __webpack_require__(/*! ./schedulerFactory.js */ \"./server/schedulerFactory.js\"); // const accountSid = 'AC019a30196451142d27d879a8f687f3cc';\n// const authToken = '978f64b17f1149a06b5f1a84c6fe1bf4';\n// const MessagingResponse = require('twilio').twiml.MessagingResponse;\n\n\napp.use(methodOverride('_method'));\napp.use(bodyParser.json()); // to support JSON-encoded bodies\n\napp.use(bodyParser.urlencoded({\n  // to support URL-encoded bodies\n  extended: true\n}));\napp.get('/', function (req, res) {\n  //grabs from DB\n  // console.log('this is a GET request')\n  var tasks;\n  TaskDB.find({}).exec().then(function (data) {\n    tasks = data; // console.log(\"THIS IS TASKS********\",tasks);\n  }).then(function () {\n    var appString = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_2__[\"renderToString\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_App_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n      tasks: tasks,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 38\n      },\n      __self: this\n    }));\n    var indexFile = path.resolve('../to-do-app original/public/index.html');\n    fs__WEBPACK_IMPORTED_MODULE_3___default.a.readFile(indexFile, 'utf8', function (err, data) {\n      if (err) {\n        console.error('Something went wrong:', err);\n        return res.status(500).send('Oops, better luck next time!');\n      }\n\n      return res.send(data.replace('<div id=\"root\"></div>', \"<div id=\\\"root\\\">\".concat(appString, \"</div>\")));\n    });\n  }).catch(function (err) {\n    console.log(err, 'THIS IS A GET PROMISE ERROR');\n  });\n});\napp.post('/', function (req, res) {\n  //database endpoint; submits data from user input\n  var tasks; // console.log(req.body, \"*******\")\n\n  TaskDB.create(req.body, function (err, result) {\n    if (err) {\n      console.log('ERROR IN CREATE ', err);\n    }\n\n    console.log('CREATE SUCCESS ', result);\n    TaskDB.find({}).exec().then(function (data) {\n      // console.log('THIS IS DATA*******', data)\n      tasks = data;\n      console.log('THIS IS TASKS******', tasks);\n    }).then(function () {\n      var appString = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_2__[\"renderToString\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_App_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        tasks: tasks,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 69\n        },\n        __self: this\n      }));\n      var indexFile = path.resolve('../to-do-app original/public/index.html');\n      fs__WEBPACK_IMPORTED_MODULE_3___default.a.readFile(indexFile, 'utf8', function (err, data) {\n        if (err) {\n          console.error('Something went wrong:', err);\n          return res.status(500).send('Oops, better luck next time!');\n        }\n\n        return res.send(data.replace('<div id=\"root\"></div>', \"<div id=\\\"root\\\">\".concat(appString, \"</div>\")));\n      });\n    }).catch(function (err) {\n      console.log(err, 'THIS IS A POST PROMISE ERROR');\n    });\n  });\n});\napp.delete('/tasks/:id', function (req, res) {\n  console.log('DELETE REQUEST WORKING');\n  console.log(req.params);\n  var tasks;\n  TaskDB.findByIdAndRemove({\n    _id: req.params.id\n  }, function (err, data) {\n    if (err) {\n      console.log(\"DELETE REQUEST ERROR\");\n    }\n\n    console.log('SUCCESSFULLY DELETED FINALLY ');\n    TaskDB.find({}).exec().then(function (data) {\n      console.log(data);\n      tasks = data;\n    }).then(function () {\n      var appString = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_2__[\"renderToString\"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_App_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        tasks: tasks,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 101\n        },\n        __self: this\n      }));\n      var indexFile = path.resolve('../to-do-app original/public/index.html');\n      fs__WEBPACK_IMPORTED_MODULE_3___default.a.readFile(indexFile, 'utf8', function (err, data) {\n        if (err) {\n          console.error('Something went wrong:', err);\n          return res.status(500).send('Oops, better luck next time!');\n        }\n\n        return res.send(data.replace('<div id=\"root\"></div>', \"<div id=\\\"root\\\">\".concat(appString, \"</div>\")));\n      });\n    }).catch(function (err) {\n      console.log(err, 'THIS IS A DELETE PROMISE ERROR');\n    });\n  });\n}); // app.post('/sms', (req, res) => {\n// console.log('REQ.PARAMS HERE', req.params)\n// console.log('Twilio post request working')\n// const twiml = new MessagingResponse();\n// client.messages\n// .create({\n//    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',\n//    from: '+15165634928',\n//    to: '+4159944797'\n//  })\n// .then(message => console.log(message.sid));\n// twiml.message('The Robots are coming! Head for the hills!');\n// res.writeHead(200, {'Content-Type': 'text/xml'});\n// res.end(twiml.toString());\n// });\n\nschedulerFactory.start();\napp.listen(8080);\nconsole.log('Node server running on port 8080'); // module.exports = schedulerFactory();\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ "./src/Alert.js":
/*!**********************!*\
  !*** ./src/Alert.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _jsxFileName = \"/home/sjl/Documents/Programming Materials/Chingu/geckos-project-10/to-do-app original/src/Alert.js\";\n\n\nvar Alert = function Alert(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 6\n    },\n    __self: this\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    name: \"alert-time\",\n    type: \"time\",\n    onChange: props.onChange,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 7\n    },\n    __self: this\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Alert);\n\n//# sourceURL=webpack:///./src/Alert.js?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_sjl_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _home_sjl_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _home_sjl_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js\");\n/* harmony import */ var _home_sjl_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var _home_sjl_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ \"./node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _Form_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Form.js */ \"./src/Form.js\");\n/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Task.js */ \"./src/Task.js\");\n/* harmony import */ var _public_App_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../public/App.css */ \"./public/App.css\");\n/* harmony import */ var _public_App_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_public_App_css__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\nvar _jsxFileName = \"/home/sjl/Documents/Programming Materials/Chingu/geckos-project-10/to-do-app original/src/App.js\";\n\n\n\n\nvar mainDiv = {\n  textAlign: 'center'\n};\n\nvar App =\n/*#__PURE__*/\nfunction (_Component) {\n  Object(_home_sjl_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(App, _Component);\n\n  function App(props) {\n    var _this;\n\n    Object(_home_sjl_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, App);\n\n    _this = Object(_home_sjl_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, Object(_home_sjl_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(App).call(this, props));\n    _this.state = {\n      tasks: _this.props.tasks\n    };\n    return _this;\n  }\n\n  Object(_home_sjl_Documents_Programming_Materials_Chingu_geckos_project_10_to_do_app_original_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(App, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        style: mainDiv,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 22\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"h1\", {\n        className: \"title\",\n        style: {\n          textAlign: 'center'\n        },\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 23\n        },\n        __self: this\n      }, \"To Do List\"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Form_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 27\n        },\n        __self: this\n      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Task_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n        tasks: this.state.tasks,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 28\n        },\n        __self: this\n      }));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/Form.js":
/*!*********************!*\
  !*** ./src/Form.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Alert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Alert.js */ \"./src/Alert.js\");\nvar _jsxFileName = \"/home/sjl/Documents/Programming Materials/Chingu/geckos-project-10/to-do-app original/src/Form.js\";\n\n // export default class Form extends React.Component { //stateful component\n\nvar Form = function Form(props) {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 8\n    },\n    __self: this\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n    method: \"POST\",\n    action: \"/\",\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 9\n    },\n    __self: this\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    name: \"task\",\n    type: \"text\",\n    onChange: props.onChange,\n    placeholder: \"Type your task\",\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 10\n    },\n    __self: this\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 10\n    },\n    __self: this\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    name: \"time\",\n    type: \"datetime-local\",\n    onChange: props.time,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 11\n    },\n    __self: this\n  }), \" \", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 11\n    },\n    __self: this\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    name: \"number\",\n    type: \"text\",\n    onChange: props.number,\n    placeholder: \"Type your number\",\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 12\n    },\n    __self: this\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    onClick: props.onSubmit,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 14\n    },\n    __self: this\n  }, \"Submit\")));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Form); // render(){\n//     return (\n// <div>\n// <form>\n//     <input name=\"task\" type=\"text\" value={this.props.input} onChange = {this.handleChangeInput}  placeholder=\"Type your task\" /><br></br>\n//     {/* how to access 'name' from input tag? */}\n//     <Alert />    \n//     <button onClick={this.handleClick} >Submit</button>\n// </form>\n//  <Task item={this.props.form} />\n// </div>\n//     )\n// }\n// }\n\n//# sourceURL=webpack:///./src/Form.js?");

/***/ }),

/***/ "./src/Task.js":
/*!*********************!*\
  !*** ./src/Task.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _jsxFileName = \"/home/sjl/Documents/Programming Materials/Chingu/geckos-project-10/to-do-app original/src/Task.js\";\n\n\nvar Task = function Task(props) {\n  {\n    var key = 0;\n  } // console.log('THIS IS PROPS', props.tasks)\n\n  var widthStyle = {\n    width: 'auto',\n    display: 'inline'\n  };\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 15\n    },\n    __self: this\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"ol\", {\n    style: {\n      display: 'inline-block'\n    },\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 16\n    },\n    __self: this\n  }, props.tasks.map(function (entry) {\n    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      style: widthStyle,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 19\n      },\n      __self: this\n    }, \",\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"li\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 20\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n      style: {\n        display: 'inline'\n      },\n      method: \"POST\",\n      action: \"/tasks/\".concat(entry._id, \"?_method=DELETE\"),\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 21\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n      style: {\n        display: 'inline'\n      },\n      key: entry._id,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 22\n      },\n      __self: this\n    }, \" \", entry.task, \" \", entry.time.toString().split('G')[0]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 23\n      },\n      __self: this\n    }, \"Delete\"))));\n  })));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Task);\n\n//# sourceURL=webpack:///./src/Task.js?");

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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

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

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

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