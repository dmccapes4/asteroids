const Game = require('./game');

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
