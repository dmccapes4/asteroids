const MovingObject = require('./moving_object');
const Asteroid = require('./asteroid');
const Util = require('./utils');

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
