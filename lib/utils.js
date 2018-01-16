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
