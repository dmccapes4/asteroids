const Game = require('./lib/game.js');
const Util = require('./lib/utils.js');
const GameView = require('./lib/game_view.js');


document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const gameView = new GameView(canvas, ctx);
  gameView.start();
});
