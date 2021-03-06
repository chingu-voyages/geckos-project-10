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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_App_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var jss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var jss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jss_lib_JssProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony import */ var react_jss_lib_JssProvider__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jss_lib_JssProvider__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(21);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22);
/* harmony import */ var _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_colors_red__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(23);
/* harmony import */ var _material_ui_core_colors_red__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_red__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _material_ui_core_colors_yellow__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(24);
/* harmony import */ var _material_ui_core_colors_yellow__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_colors_yellow__WEBPACK_IMPORTED_MODULE_9__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }












var express = __webpack_require__(25);

var bodyParser = __webpack_require__(26);

var path = __webpack_require__(27);

var app = express();

var methodOverride = __webpack_require__(28);

var http = __webpack_require__(29);

var cron = __webpack_require__(30);

var TaskDB = __webpack_require__(31);

var schedulerFactory = __webpack_require__(35);

var port = process.env.PORT || 3000;

var moment = __webpack_require__(33);

var test = new Date(); // console.log(test);
// console.log(moment.utc(test).format());
// const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(methodOverride("_method"));
app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({
  // to support URL-encoded bodies
  extended: true
}));
app.get("/", function (req, res) {
  //grabs from DB
  // console.log('this is a GET request')
  var tasks;
  TaskDB.find({}).exec().then(function (data) {
    tasks = data; // console.log("THIS IS TASKS********",tasks);
  }).then(function () {
    var css = new Set(); // CSS for all rendered React components

    var insertCss = function insertCss() {
      for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
        styles[_key] = arguments[_key];
      }

      return styles.forEach(function (style) {
        return css.add(style._getCss());
      });
    }; // Create a sheetsRegistry instance.


    var sheetsRegistry = new jss__WEBPACK_IMPORTED_MODULE_4__["SheetsRegistry"](); // Create a sheetsManager instance.

    var sheetsManager = new Map(); // Create a theme instance.

    var theme = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["createMuiTheme"])({
      palette: {
        primary: _material_ui_core_colors_green__WEBPACK_IMPORTED_MODULE_7___default.a,
        secondary: _material_ui_core_colors_yellow__WEBPACK_IMPORTED_MODULE_9___default.a,
        type: "light"
      }
    }); // Create a new class name generator.

    var generateClassName = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["createGenerateClassName"])();
    var appString = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_2__["renderToString"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_jss_lib_JssProvider__WEBPACK_IMPORTED_MODULE_5___default.a, {
      registry: sheetsRegistry,
      generateClassName: generateClassName
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["MuiThemeProvider"], {
      theme: theme,
      sheetsManager: sheetsManager
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_3___default.a.Provider, {
      value: {
        insertCss: insertCss
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_src_App_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
      tasks: tasks
    })))));
    var css1 = sheetsRegistry.toString(); // console.log("****css****\n", css, "\n");
    // console.log('****CSS1****\n', css1)

    var indexFile = "\n    <!DOCTYPE html>\n    <html lang=\"en\">\n      <head>\n        <meta charset=\"utf-8\">\n        <link rel=\"shortcut icon\" href=\"%PUBLIC_URL%/favicon.ico\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">\n        <meta name=\"theme-color\" content=\"#000000\">\n        <style>".concat(_toConsumableArray(css).join("")).concat(css1, "</style>\n        <title>React App</title>\n      </head>\n      <body>\n        <noscript>\n          You need to enable JavaScript to run this app.\n        </noscript>\n        <div id=\"root\">").concat(appString, "</div>\n\n      </body>\n    </html>\n  ");
    res.status(200).send(indexFile);
  })["catch"](function (err) {
    console.log(err, "THIS IS A GET PROMISE ERROR");
  });
});
app.post("/tasks", function (req, res) {
  //database endpoint; submits data from user input
  // let tasks;
  // console.log(res.body, "RES.BODY");
  console.log(req.body, "REQ.BODY"); // req.body = {
  //   task : 'to dooo',
  //   time: {date},
  //   timezone: 'EST'
  // }
  // '2016-01-01T23:35:01' 2019-04-25 20:51:00.000
  // CONVERT THEIR TIME from their TIMEZONE to Pacific TIME
  // CREATE DOCUMENT OBJECT WITH THE NEW CONVERTED TIME AND THEN INSERT TO DATABASE

  TaskDB.create(req.body, function (err, result) {
    if (err) {
      console.log("ERROR IN CREATE ", err);
    }

    console.log("CREATE SUCCESS ", result);
  });
  res.status(200).redirect("/"); // })
  // .catch(err => {
  //   console.log(err, "THIS IS A POST PROMISE ERROR");
  // });
  // });
});
app["delete"]("/tasks/:id", function (req, res) {
  // console.log("DELETE REQUEST WORKING");
  // console.log(req.params);
  // let tasks;
  TaskDB.findByIdAndRemove({
    _id: req.params.id
  }, function (err, data) {
    if (err) {
      console.log("DELETE REQUEST ERROR");
    }
  });
  res.status(200).redirect("/"); // })
  // .catch(err => {
  //   console.log(err, "THIS IS A DELETE PROMISE ERROR");
  // });
  // });
});
schedulerFactory.start();
app.listen(port);
console.log("Node server running on port ", port); // module.exports = schedulerFactory();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Title_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(16);
/* harmony import */ var isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var mainDiv = {
  textAlign: "center"
};

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.state = {
      tasks: _this.props.tasks
    };
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: mainDiv
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "title-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Title_js__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form_js__WEBPACK_IMPORTED_MODULE_1__["default"], null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Task_js__WEBPACK_IMPORTED_MODULE_2__["default"], {
        tasks: this.state.tasks
      }));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (isomorphic_style_loader_withStyles__WEBPACK_IMPORTED_MODULE_5___default()(_App_css__WEBPACK_IMPORTED_MODULE_3___default.a)(App));

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Alert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DropDown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _DropDown__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_DropDown__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
/* harmony import */ var _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);
/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_6__);
var _this = undefined;

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }







 // export default class Form extends React.Component { //stateful component

var Form = function Form(props) {
  var toClose = false;

  var toggle = function toggle(e) {
    e.stopPropagation();
    var btn = _this;
    var menu = btn.nextSibling;

    while (menu && menu.nodeType != 1) {
      menu = menu.nextSibling;
    }

    if (!menu) return;

    if (menu.style.display !== "block") {
      menu.style.display = "block";
      if (toClose) toClose.style.display = "none";
      toClose = (_readOnlyError("toClose"), menu);
    } else {
      menu.style.display = "none";
      toClose = (_readOnlyError("toClose"), false);
    }
  };

  var closeAll = function closeAll() {
    toClose.style.display = "none";
  };

  var addEventListener = ("DOMContentLoaded", function () {
    document.querySelectorAll(".btn-buy-list").forEach(function (btn) {
      btn.addEventListener("click", toggle, true);
    });
  });

  var onclick = function onclick(event) {
    if (toClose) {
      closeAll.call(event.target);
    }
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "task-form"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    method: "POST",
    action: "/tasks"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
    required: true // style={{margin: 10}}
    ,
    margin: "normal",
    variant: "outlined",
    name: "task",
    type: "text",
    placeholder: "Type your task"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
    required: true,
    id: "form-input-field" // label="Required"
    ,
    margin: "normal",
    variant: "outlined",
    name: "time",
    type: "datetime-local" // onChange={props.time}

  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_5___default.a, {
    required: true,
    id: "form-input-field",
    name: "number",
    type: "text" // onChange={props.number}
    ,
    placeholder: "Type your number",
    margin: "normal",
    variant: "outlined"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_4___default.a, {
    id: "submit-button",
    type: "submit",
    variant: "contained",
    color: "primary",
    margin: "normal",
    size: "large"
  }, "Submit")));
};

/* harmony default export */ __webpack_exports__["default"] = (Form); // render(){
//     return (
// <div>
// <form>
//     <input name="task" type="text" value={this.props.input} onChange = {this.handleChangeInput}  placeholder="Type your task" /><br></br>
//     {/* how to access 'name' from input tag? */}
//     <Alert />
//     <button onClick={this.handleClick} >Submit</button>
// </form>
//  <Task item={this.props.form} />
// </div>
//     )
// }
// }

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


var Alert = function Alert(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    name: "alert-time",
    type: "time",
    onChange: props.onChange
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Alert);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// import ReactDOM from "react-dom";
// import React, { Component } from "react";
// const Dropdown = require("react-simple-dropdown");
// const DropdownTrigger = Dropdown.DropdownTrigger;
// const DropdownContent = Dropdown.DropdownContent;
// const Menu = () => {
//   return (
//     <div>
//       <Dropdown>
//         <DropdownTrigger>Profile</DropdownTrigger>
//         <DropdownContent>
//           Username
//           <ul>
//             <li>
//               <a href="/profile">Profile</a>
//             </li>
//             <li>
//               <a href="/favorites">Favorites</a>
//             </li>
//             <li>
//               <a href="/logout">Log Out</a>
//             </li>
//           </ul>
//         </DropdownContent>
//       </Dropdown>
//     </div>
//     // <div>THIS IS MENU</div>
//   );
// };
// export default Menu;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/TextField");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/MenuItem");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_1__);



var Task = function Task(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ol", null, props.tasks.map(function (entry) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "task-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      method: "POST",
      action: "/tasks/".concat(entry._id, "?_method=DELETE")
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "userTask",
      key: entry._id
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "entry-task"
    }, entry.task), " due on", " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "entry-time"
    }, entry.time.toString().split("G")[0])), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "submit",
      variant: "contained",
      color: "secondary",
      size: "small",
      className: "delete-button"
    }, "x"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null))));
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Task);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


    var refs = 0;
    var css = __webpack_require__(12);
    var insertCss = __webpack_require__(14);
    var content = typeof css === 'string' ? [[module.i, css, '']] : css;

    exports = module.exports = css.locals || {};
    exports._getContent = function() { return content; };
    exports._getCss = function() { return '' + css; };
    exports._insertCss = function(options) { return insertCss(content, options) };

    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) { var removeCss; }
  

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(13)(false);
// Module
exports.push([module.i, "/* Basic styles */\r\n*,\r\n*::before,\r\n*::after {\r\n  box-sizing: border-box;\r\n}\r\n\r\n:root {\r\n  --bg-color: #d8d8d8;\r\n}\r\n\r\nbody {\r\n  /* display: flex; */\r\n  /* align-items: center; */\r\n  /* justify-content: center; */\r\n  /* overflow: hidden; */\r\n  width: 100vw;\r\n  height: 100vh;\r\n  color: #000;\r\n  background-color: white;\r\n  overflow-x: hidden;\r\n  /* font-family: 'Maitree', serif; */\r\n  font-family: \"Libre Franklin\", sans-serif;\r\n  margin: 0 !important;\r\n}\r\n\r\n/* TITLE CONTAINER */\r\n\r\n#title-form {\r\n  background: linear-gradient(rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0.74)), url(\"https://images.unsplash.com/photo-1540921304892-aae50a14c9a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80\");\r\n  background-repeat: no-repeat;\r\n  background-position: bottom;\r\n  background-size: cover;\r\n  position: relative;\r\n  padding-bottom: 1rem;\r\n  overflow: hidden;\r\n}\r\n\r\n.title-container {\r\n  /* line-height: 300px; */\r\n  margin: 0;\r\n  top: 0;\r\n  left: 0;\r\n  padding-left: 2rem;\r\n  /* height: 30rem; */\r\n}\r\n\r\n.title-container h1 {\r\n  overflow: hidden;\r\n  font-size: 79px;\r\n  color: black;\r\n  /* position: absolute; */\r\n  bottom: 0;\r\n  display: block;\r\n  align-self: flex-end;\r\n  /* text-align: left; */\r\n  margin: 0px 0px 11px -2px;\r\n  letter-spacing: -3px;\r\n  word-spacing: 1px;\r\n  font-weight: bolder;\r\n  text-transform: uppercase;\r\n  padding-top: 10rem;\r\n}\r\n.title-container p {\r\n  bottom: 0;\r\n  display: inline-block;\r\n  align-self: flex-end;\r\n  margin: 0 53px 25px 0px;\r\n  font-size: 1.1rem;\r\n  height: 20px;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n/* TASK FORM */\r\n\r\n#task-form {\r\n  display: flex;\r\n  justify-content: center;\r\n  margin-bottom: 2rem;\r\n}\r\n\r\n.MuiInputBase-root-18 {\r\n  margin: 0 1rem;\r\n}\r\n.userTask {\r\n  font-family: \"Libre Franklin\", sans-serif;\r\n  animation: fade-in-right ease 1s forwards;\r\n  font-size: 1rem;\r\n}\r\n.delete-button {\r\n  background-color: transparent;\r\n  border: transparent solid 1px;\r\n  color: #adc3b7;\r\n  font-size: 1.07rem;\r\n  font-weight: bolder;\r\n}\r\n.delete-button:hover {\r\n  color: #687c72;\r\n}\r\n\r\n/* TASK LIST */\r\n\r\n#task-container {\r\n  margin: 2rem auto;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\nli {\r\n  font-size: 1.5rem;\r\n  padding-top: 20px;\r\n  list-style-type: none;\r\n}\r\n\r\n#submit-button {\r\n  color: white;\r\n  background-color: #adc3b7;\r\n  display: inline-block;\r\n  margin-top: 1rem;\r\n}\r\n#submit-button:hover {\r\n  background-color: #8da799;\r\n  transition-delay: 0.2s;\r\n}\r\n\r\n.userTask {\r\n  font-size: 1rem;\r\n  box-shadow: rgba(32, 33, 36, 0.17) 3px 4px 11px;\r\n  border-radius: 8px;\r\n  padding: 19px;\r\n  letter-spacing: 0.05rem;\r\n}\r\n.entry-task {\r\n  display: inline;\r\n  font-weight: bold\r\n}\r\n.entry-time {\r\n  display: inline;\r\n}\r\n\r\n\r\n/* KEY FRAMES */\r\n\r\n@keyframes fade-in-right {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateX(-15px);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: translateX(0);\r\n  }\r\n}\r\n", ""]);



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */



var inserted = {};

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode("0x" + p1);
  }));
}

function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(id);

      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

function insertCss(styles, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$replace = _ref.replace,
      replace = _ref$replace === void 0 ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === void 0 ? false : _ref$prepend,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? 's' : _ref$prefix;

  var ids = [];

  for (var i = 0; i < styles.length; i++) {
    var _styles$i = styles[i],
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];
    var id = "" + prefix + moduleId + "-" + i;
    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;
    var elem = document.getElementById(id);
    var create = false;

    if (!elem) {
      create = true;
      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;

    if (sourceMap && typeof btoa === 'function') {
      cssText += "\n/*# sourceMappingURL=data:application/json;base64," + b64EncodeUnicode(JSON.stringify(sourceMap)) + "*/";
      cssText += "\n/*# sourceURL=" + sourceMap.file + "?" + id + "*/";
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;
//# sourceMappingURL=insertCss.js.map


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);



var Title = function Title(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "title-container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "My To Do List"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Keep all your tasks in one place and receive SMS reminders when they're due"));
};

/* harmony default export */ __webpack_exports__["default"] = (Title);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/withStyles");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/StyleContext");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("jss");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("react-jss/lib/JssProvider");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/colors/green");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/colors/red");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/colors/yellow");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("method-override");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("node-cron");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(32);

var moment = __webpack_require__(33);

var Twilio = __webpack_require__(34); // const accountSid = 'AC019a30196451142d27d879a8f687f3cc';
// const authToken = '978f64b17f1149a06b5f1a84c6fe1bf4';


var accountSid = process.env.TWILIO_SID || 'AC019a30196451142d27d879a8f687f3cc',
    authToken = process.env.TWILIO_AUTHTOKEN || '978f64b17f1149a06b5f1a84c6fe1bf4',
    mongoPW = process.env.MONGO_PW;
mongoose.Promise = global.Promise; // mongoose.connect("mongodb://localhost:27017/to-do-app-original",  {useNewUrlParser: true}); //creating the database

mongoose.connect("mongodb+srv://sjl:".concat(mongoPW, "@ssr-todo-app-jvm4p.mongodb.net/ssr-todo-app"), {
  useNewUrlParser: true
});
var nameSchema = mongoose.Schema({
  task: String,
  number: String,
  notification: Number,
  currentTime: String,
  time: {
    type: Date,
    index: true
  }
}, {
  versionKey: false
}); //  console.log('MOMENT\n',moment(this.time))
//  console.log(moment(this.time).tz("America/Los_Angeles"))
//  console.log('MOMENT END\n',moment(this.time).tz("America/Los_Angeles")).utc();

nameSchema.methods.requiresNotification = function (date) {
  // NOT USED IN CODE.ONLY FOR CONSOLE LOG REFERENCE
  var taskDueTime = moment(this.time).tz("America/Los_Angeles").format('LLL');
  var pacificTime = "Los_Angeles";
  var currentTime = moment(date).tz("America/Los_Angeles").format('LLL');
  console.log('*database entry time*\n', taskDueTime);
  console.log('*current time*\n', currentTime); // console.log('*difference in time\n', Math.round(moment.duration(moment(this.time).tz("America/Los_Angeles").utc().diff(moment(date).tz("America/Los_Angeles").utc())).asMinutes()))

  console.log('*difference in time\n', Math.round(moment.duration(moment(this.time).utc().diff(moment(date).utc())).asMinutes()));
  var minutesBeforeText = 0; // Return difference of taskeDueTime and currentTime is equal to minutesBeforeText
  // return Math.round(moment.duration(moment(this.time).tz("America/Los_Angeles").utc().diff(moment(date).tz("America/Los_Angeles").utc())).asMinutes()) === minutesBeforeText;

  return Math.round(moment.duration(moment(this.time).diff(moment(date))).asMinutes()) === minutesBeforeText;
};

nameSchema.statics.sendNotifications = function (callback) {
  // now
  var searchDate = new Date(); //utc on heroku unless we specify timezone on heroku via TZ = timezone Config Variable

  TaskDB.find().then(function (tasks) {
    tasks = tasks.filter(function (task) {
      return task.requiresNotification(searchDate);
    });

    if (tasks.length > 0) {
      sendNotifications(tasks);
    }
  });

  function sendNotifications(tasks) {
    var client = new Twilio(accountSid, authToken);
    tasks.forEach(function (task) {
      // Create options to send the message
      var options = {
        to: "+1".concat(task.number),
        from: '+15165634928',

        /* eslint-disable max-len */
        body: "".concat(task.task)
        /* eslint-enable max-len */

      };
      console.log('THIS IS OPTIONS!', options); // Send the message!

      client.messages.create(options, function (err, response) {
        if (err) {
          // Just log it for now
          console.error(err);
        } else {
          // Log the last few digits of a phone number
          var masked = task.number.substr(0, task.number.length - 5);
          masked += '*****';
          console.log("Message sent to ".concat(masked));
        }
      });
    }); // Don't wait on success/failure, just indicate all messages have been
    // queued for delivery

    if (callback) {
      callback.call();
    }
  }
};

var TaskDB = mongoose.model("task", nameSchema);
module.exports = TaskDB;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("twilio");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var CronJob = __webpack_require__(36).CronJob;

var notificationWorkerFactory = __webpack_require__(37);

var moment = __webpack_require__(33);

var schedulerFactory = function schedulerFactory() {
  return {
    start: function start() {
      new CronJob('00 * * * * *', function () {
        console.log('Running Send Notifications Worker for ' + moment().format());
        notificationWorkerFactory.run();
      }, null, true, '');
    }
  };
};

module.exports = schedulerFactory();

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("cron");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var TaskDB = __webpack_require__(31);

var notificationWorkerFactory = function notificationWorkerFactory() {
  return {
    run: function run() {
      TaskDB.sendNotifications();
    }
  };
};

module.exports = notificationWorkerFactory();

/***/ })
/******/ ]);