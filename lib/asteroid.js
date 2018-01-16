const Util = require('./utils');
const MovingObject = require('./moving_object');

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
