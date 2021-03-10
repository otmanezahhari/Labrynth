/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/maze.js":
/*!*********************!*\
  !*** ./src/maze.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // Initialize the canvas

var maze = document.querySelector(".maze");
var ctx = maze.getContext("2d");
var generationComplete = false;
var current;
var goal;

var Maze = /*#__PURE__*/function () {
  function Maze(size, rows, columns) {
    _classCallCheck(this, Maze);

    this.size = size;
    this.columns = columns;
    this.rows = rows;
    this.grid = [];
    this.stack = [];
  } // Set the grid: Create new this.grid array based on number of instance rows and columns


  _createClass(Maze, [{
    key: "setup",
    value: function setup() {
      for (var r = 0; r < this.rows; r++) {
        var row = [];

        for (var c = 0; c < this.columns; c++) {
          // Create a new instance of the Cell class for each element in the 2D array and push to the maze grid array
          var cell = new Cell(r, c, this.grid, this.size);
          row.push(cell);
        }

        this.grid.push(row);
      } // Set the starting grid


      current = this.grid[0][0];
      this.grid[this.rows - 1][this.columns - 1].goal = true;
    } // Draw the canvas by setting the size and placing the cells in the grid array on the canvas.

  }, {
    key: "draw",
    value: function draw() {
      var _this = this;

      maze.width = this.size;
      maze.height = this.size;
      maze.style.background = "black"; // Set the first cell as visited

      current.visited = true; // Loop through the 2d grid array and call the show method for each cell instance

      for (var r = 0; r < this.rows; r++) {
        for (var c = 0; c < this.columns; c++) {
          var grid = this.grid;
          grid[r][c].show(this.size, this.rows, this.columns);
        }
      } // This function will assign the variable 'next' to random cell out of the current cells available neighbouting cells


      var next = current.checkNeighbours(); // If there is a non visited neighbour cell

      if (next) {
        next.visited = true; // Add the current cell to the stack for backtracking

        this.stack.push(current); // this function will highlight the current cell on the grid. The parameter columns is passed
        // in order to set the size of the cell

        current.highlight(this.columns); // This function compares the current cell to the next cell and removes the relevant walls for each cell

        current.removeWalls(current, next); // Set the nect cell to the current cell

        current = next; // Else if there are no available neighbours start backtracking using the stack
      } else if (this.stack.length > 0) {
        var cell = this.stack.pop();
        current = cell;
        current.highlight(this.columns);
      } // If no more items in the stack then all cells have been visted and the function can be exited


      if (this.stack.length === 0) {
        generationComplete = true;
        return;
      } // Recursively call the draw function. This will be called up until the stack is empty


      window.requestAnimationFrame(function () {
        _this.draw();
      }); //     setTimeout(() => {rd
      //       this.draw();
      //     }, 10);
    }
  }]);

  return Maze;
}();

var Cell = /*#__PURE__*/function () {
  // Constructor takes in the rowNum and colNum which will be used as coordinates to draw on the canvas.
  function Cell(rowNum, colNum, parentGrid, parentSize) {
    _classCallCheck(this, Cell);

    this.rowNum = rowNum;
    this.colNum = colNum;
    this.visited = false;
    this.walls = {
      topWall: true,
      rightWall: true,
      bottomWall: true,
      leftWall: true
    };
    this.goal = false; // parentGrid is passed in to enable the checkneighbours method.
    // parentSize is passed in to set the size of each cell on the grid

    this.parentGrid = parentGrid;
    this.parentSize = parentSize;
  }

  _createClass(Cell, [{
    key: "checkNeighbours",
    value: function checkNeighbours() {
      var grid = this.parentGrid;
      var row = this.rowNum;
      var col = this.colNum;
      var neighbours = []; // The following lines push all available neighbours to the neighbours array
      // undefined is returned where the index is out of bounds (edge cases)

      var top = row !== 0 ? grid[row - 1][col] : undefined;
      var right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
      var bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
      var left = col !== 0 ? grid[row][col - 1] : undefined; // if the following are not 'undefined' then push them to the neighbours array

      if (top && !top.visited) neighbours.push(top);
      if (right && !right.visited) neighbours.push(right);
      if (bottom && !bottom.visited) neighbours.push(bottom);
      if (left && !left.visited) neighbours.push(left); // Choose a random neighbour from the neighbours array

      if (neighbours.length !== 0) {
        var random = Math.floor(Math.random() * neighbours.length);
        return neighbours[random];
      } else {
        return undefined;
      }
    } // Wall drawing functions for each cell. Will be called if relevent wall is set to true in cell constructor

  }, {
    key: "drawTopWall",
    value: function drawTopWall(x, y, size, columns, rows) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + size / columns, y);
      ctx.stroke();
    }
  }, {
    key: "drawRightWall",
    value: function drawRightWall(x, y, size, columns, rows) {
      ctx.beginPath();
      ctx.moveTo(x + size / columns, y);
      ctx.lineTo(x + size / columns, y + size / rows);
      ctx.stroke();
    }
  }, {
    key: "drawBottomWall",
    value: function drawBottomWall(x, y, size, columns, rows) {
      ctx.beginPath();
      ctx.moveTo(x, y + size / rows);
      ctx.lineTo(x + size / columns, y + size / rows);
      ctx.stroke();
    }
  }, {
    key: "drawLeftWall",
    value: function drawLeftWall(x, y, size, columns, rows) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + size / rows);
      ctx.stroke();
    } // Highlights the current cell on the grid. Columns is once again passed in to set the size of the grid.

  }, {
    key: "highlight",
    value: function highlight(columns) {
      // Additions and subtractions added so the highlighted cell does cover the walls
      var x = this.colNum * this.parentSize / columns + 1;
      var y = this.rowNum * this.parentSize / columns + 1;
      ctx.fillStyle = "purple";
      ctx.fillRect(x, y, this.parentSize / columns - 3, this.parentSize / columns - 3);
    }
  }, {
    key: "removeWalls",
    value: function removeWalls(cell1, cell2) {
      // compares to two cells on x axis
      var x = cell1.colNum - cell2.colNum; // Removes the relevant walls if there is a different on x axis

      if (x === 1) {
        cell1.walls.leftWall = false;
        cell2.walls.rightWall = false;
      } else if (x === -1) {
        cell1.walls.rightWall = false;
        cell2.walls.leftWall = false;
      } // compares to two cells on x axis


      var y = cell1.rowNum - cell2.rowNum; // Removes the relevant walls if there is a different on x axis

      if (y === 1) {
        cell1.walls.topWall = false;
        cell2.walls.bottomWall = false;
      } else if (y === -1) {
        cell1.walls.bottomWall = false;
        cell2.walls.topWall = false;
      }
    } // Draws each of the cells on the maze canvas

  }, {
    key: "show",
    value: function show(size, rows, columns) {
      var x = this.colNum * size / columns;
      var y = this.rowNum * size / rows; // console.log(`x =${x}`);
      // console.log(`y =${y}`);

      ctx.strokeStyle = "#ffffff";
      ctx.fillStyle = "black";
      ctx.lineWidth = 2;
      if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
      if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
      if (this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
      if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);

      if (this.visited) {
        ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
      }

      if (this.goal) {
        ctx.fillStyle = "rgb(83, 247, 43)";
        ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
      }
    }
  }]);

  return Cell;
}();


var form = document.querySelector("#settings");
var size = document.querySelector("#size");
var rowsCols = document.querySelector("#number");
var complete = document.querySelector(".complete");
var replay = document.querySelector(".replay");
var close = document.querySelector(".close");
var newMaze;
form.addEventListener("submit", generateMaze);
document.addEventListener("keydown", move);
replay.addEventListener("click", function () {
  location.reload();
});
close.addEventListener("click", function () {
  complete.style.display = "none";
});

function generateMaze(e) {
  e.preventDefault();

  if (rowsCols.value == "" || size.value == "") {
    return alert("Please enter all fields");
  }

  var mazeSize = size.value;
  var number = rowsCols.value;

  if (mazeSize > 600 || number > 50) {
    alert("Maze too large!");
    return;
  }

  form.style.display = "none";
  newMaze = new Maze(mazeSize, number, number);
  newMaze.setup();
  newMaze.draw();
}

function move(e) {
  if (!generationComplete) return;
  var key = e.key;
  var row = current.rowNum;
  var col = current.colNum;

  switch (key) {
    case "ArrowUp":
      if (!current.walls.topWall) {
        var next = newMaze.grid[row - 1][col];
        current = next;
        newMaze.draw();
        current.highlight(newMaze.columns); // not required if goal is in bottom right

        if (current.goal) complete.style.display = "block";
      }

      break;

    case "ArrowRight":
      if (!current.walls.rightWall) {
        var _next = newMaze.grid[row][col + 1];
        current = _next;
        newMaze.draw();
        current.highlight(newMaze.columns);
        if (current.goal) complete.style.display = "block";
      }

      break;

    case "ArrowDown":
      if (!current.walls.bottomWall) {
        var _next2 = newMaze.grid[row + 1][col];
        current = _next2;
        newMaze.draw();
        current.highlight(newMaze.columns);
        if (current.goal) complete.style.display = "block";
      }

      break;

    case "ArrowLeft":
      if (!current.walls.leftWall) {
        var _next3 = newMaze.grid[row][col - 1];
        current = _next3;
        newMaze.draw();
        current.highlight(newMaze.columns); // not required if goal is in bottom right

        if (current.goal) complete.style.display = "block";
      }

      break;
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/index.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/index.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  font-family: \"Montserrat\", sans-serif;\n  color: #ffffff; }\n\nbody {\n  background-color: #fbf9f9; }\n\n.maze {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%); }\n\n#settings {\n  position: absolute;\n  padding: 1.5rem;\n  top: 50%;\n  left: 50%;\n  width: 50%;\n  height: 30%;\n  transform: translate(-50%, -50%);\n  text-align: center;\n  border: 1px solid #4285F4;\n  border-radius: 10px;\n  background-color: #4285F4;\n  font-size: 0.8rem;\n  z-index: 2; }\n\ninput {\n  margin-bottom: 1rem;\n  background-color: #4285F4;\n  text-align: center;\n  border: none;\n  border-bottom: 1px solid #ffffff;\n  margin-top: 0.2rem;\n  outline: none;\n  padding: 10px 25px; }\n\n#submit {\n  background-color: #ffffff;\n  border: 1px solid #e1e8f3;\n  border-radius: 10px;\n  cursor: pointer;\n  color: #4285F4;\n  box-shadow: 0px 2px 2px 1px black;\n  padding: 10px 25px; }\n\n#submit:hover {\n  opacity: 0.7; }\n\n.complete {\n  display: none;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 50%;\n  height: 30%;\n  background: #000000;\n  z-index: 4;\n  padding: 2rem;\n  text-align: center;\n  border-radius: 10px; }\n\n.heading-game {\n  text-align: center; }\n  .heading-game .title {\n    color: #000000;\n    font-family: \"Bungee Inline\", cursive;\n    padding-top: 60px;\n    position: relative;\n    display: inline-block; }\n    .heading-game .title::before {\n      content: '';\n      width: 0;\n      height: 4px;\n      position: absolute;\n      background-color: #000000;\n      bottom: -10px;\n      left: 50%;\n      transform: translateX(-50%);\n      opacity: 0;\n      transition: all linear .3s; }\n    .heading-game .title:hover::before {\n      width: calc(100% / 2);\n      opacity: 1; }\n", "",{"version":3,"sources":["webpack://./src/index.scss"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,qCAAqC;EACrC,cAAc,EAAA;;AAGhB;EACE,yBAAyB,EAAA;;AAG3B;EACE,kBAAkB;EAClB,SAAS;EACT,QAAQ;EACR,gCAAgC,EAAA;;AAGlC;EACE,kBAAkB;EAClB,eAAe;EACf,QAAQ;EACR,SAAS;EACT,UAAU;EACV,WAAW;EACX,gCAAgC;EAChC,kBAAkB;EAClB,yBAAyB;EACzB,mBAAmB;EACnB,yBAAyB;EACzB,iBAAiB;EACjB,UAAU,EAAA;;AAGZ;EACI,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,YAAY;EACZ,gCAAgC;EAChC,kBAAkB;EAClB,aAAa;EACb,kBAAkB,EAAA;;AAGtB;EACE,yBAAyB;EACzB,yBAAyB;EACzB,mBAAmB;EACnB,eAAe;EACf,cAAc;EACd,iCAAiC;EACjC,kBAAkB,EAAA;;AAGpB;EACE,YAAY,EAAA;;AAGd;EACE,aAAa;EACb,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,gCAAgC;EAChC,UAAU;EACV,WAAW;EACX,mBAAmB;EACnB,UAAU;EACV,aAAa;EACb,kBAAkB;EAClB,mBAAmB,EAAA;;AAIrB;EACE,kBAAkB,EAAA;EADpB;IAGI,cAAc;IACd,qCAAqC;IACrC,iBAAiB;IACjB,kBAAkB;IAClB,qBAAqB,EAAA;IAPzB;MASM,WAAW;MACX,QAAQ;MACR,WAAW;MACX,kBAAkB;MAClB,yBAAyB;MACzB,aAAa;MACb,SAAS;MACT,2BAA2B;MAC3B,UAAU;MACV,0BAA0B,EAAA;IAlBhC;MAsBM,qBAAqB;MACrB,UAAU,EAAA","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: \"Montserrat\", sans-serif;\r\n  color: #ffffff;\r\n}\r\n\r\nbody {\r\n  background-color: #fbf9f9;\r\n}\r\n\r\n.maze {\r\n  position: absolute;\r\n  left: 50%;\r\n  top: 50%;\r\n  transform: translate(-50%, -50%);\r\n}\r\n\r\n#settings {\r\n  position: absolute;\r\n  padding: 1.5rem;\r\n  top: 50%;\r\n  left: 50%;\r\n  width: 50%;\r\n  height: 30%;\r\n  transform: translate(-50%, -50%);\r\n  text-align: center;\r\n  border: 1px solid #4285F4;\r\n  border-radius: 10px;\r\n  background-color: #4285F4;\r\n  font-size: 0.8rem;\r\n  z-index: 2;\r\n}\r\n\r\ninput {\r\n    margin-bottom: 1rem;\r\n    background-color: #4285F4;\r\n    text-align: center;\r\n    border: none;\r\n    border-bottom: 1px solid #ffffff;\r\n    margin-top: 0.2rem;\r\n    outline: none;\r\n    padding: 10px 25px;\r\n}\r\n\r\n#submit {\r\n  background-color: #ffffff;\r\n  border: 1px solid #e1e8f3;\r\n  border-radius: 10px;\r\n  cursor: pointer;\r\n  color: #4285F4;\r\n  box-shadow: 0px 2px 2px 1px black;\r\n  padding: 10px 25px;\r\n}\r\n\r\n#submit:hover {\r\n  opacity: 0.7;\r\n}\r\n\r\n.complete {\r\n  display: none;\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  width: 50%;\r\n  height: 30%;\r\n  background: #000000;\r\n  z-index: 4;\r\n  padding: 2rem;\r\n  text-align: center;\r\n  border-radius: 10px;\r\n}\r\n\r\n\r\n.heading-game{\r\n  text-align: center;\r\n  .title {\r\n    color: #000000;\r\n    font-family: \"Bungee Inline\", cursive; \r\n    padding-top: 60px;\r\n    position: relative;\r\n    display: inline-block;\r\n    &::before{\r\n      content: '';\r\n      width: 0;\r\n      height: 4px;\r\n      position: absolute;\r\n      background-color: #000000;\r\n      bottom: -10px;\r\n      left: 50%;\r\n      transform: translateX(-50%);\r\n      opacity: 0;\r\n      transition: all linear .3s;\r\n    }\r\n\r\n    &:hover::before{\r\n      width: calc(100% / 2);\r\n      opacity: 1;\r\n    }\r\n  }\r\n}\r\n\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./index.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/index.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/maze.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map