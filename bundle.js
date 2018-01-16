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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const Util = __webpack_require__(4);
const GameView = __webpack_require__(5);


document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const gameView = new GameView(canvas, ctx);
  gameView.start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(2);
const Asteroid = __webpack_require__(3);
const Util = __webpack_require__(4);

function Game() {
  this.DIM_X = 500;
  this.DIM_Y = 500;
  this.NUM_ASTEROIDS = 15;
  this.asteroids = [];
}

Game.prototype.addAsteroids = function() {
  let asteroid;
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    asteroid = new Asteroid({pos: Util.randomPos(500, 500)});
    this.asteroids.push(asteroid);
  }
};

Game.prototype.draw = function(ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
  this.asteroids.forEach(asteroid => { asteroid.draw(ctx); });
};

Game.prototype.move = function() {
  this.asteroids.forEach(asteroid => {
    asteroid.pos = this.wrap(asteroid.pos);
    asteroid.move(); });
};

Game.prototype.wrap = function(pos) {
  if (pos[0] >= this.DIM_X) {
    pos[0] = 0;
  } else if (pos[0] <= 0) {
    pos[0] = this.DIM_X;
  }

  if (pos[1] >= this.DIM_Y) {
    pos[1] = 0;
  } else if (pos[0] <= 0) {
    pos[1] = this.DIM_Y;
  }

  return pos;
};












Game.prototype.testRender = function() {
  const canvas = document.getElementById("canvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 500, 500);
  this.fillStyle = "blue";
  this.addAsteroids();
  this.asteroids.forEach(asteroid => {
    asteroid.draw(ctx);
  });
  console.log(this.asteroids);
  ctx.fill();
};

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function MovingObject(options) {
  this.pos = options['pos'];
  this.vel = options['vel'];
  this.radius = options['radius'];
  this.color = options['color'];
}

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

module.exports = MovingObject;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(4);
const MovingObject = __webpack_require__(2);

function Asteroid(options) {
  MovingObject.call(this, options);
  this.COLOR = 'brown';
  this.RADIUS = 10;
  this.color = this.COLOR;
  this.vel = Util.randomVec(1);
  this.pos = options['pos'];
  this.radius = this.RADIUS;
}
Asteroid.inherits(MovingObject);

module.exports = Asteroid;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

Function.prototype.inherits = function(Parent) {
  this.prototype = Object.create(Parent.prototype);
  this.prototype.constructor = this;
};

// Return a randomly oriented vector with the given length.
const Util = {
  randomVec: function(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  randomPos: function(dimX, dimY) {
    return [Math.floor(Math.random() * dimX),
            Math.floor(Math.random() * dimY)];
  },
  // Scale the length of a vector by the given amount.
  scale: function(vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

module.exports = Util;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);

function GameView(canvas, ctx) {
  this.game = new Game();
  this.canvas = canvas;
  this.ctx = ctx;
}



GameView.prototype.start = function(canvas, ctx) {
  this.canvas.width = 500;
  this.canvas.height = 500;
  this.ctx.fillStyle = "gray";
  this.ctx.fillRect(0, 0, this.game.DIM_X, this.game.DIM_Y);
  this.ctx.fill();
  this.game.addAsteroids();
  let that = this;
  setInterval(function() {
    that.game.move();
    that.game.draw(that.ctx);
  }, 10);
};



module.exports = GameView;


/***/ })
/******/ ]);