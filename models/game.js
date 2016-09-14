const mongoose = require('mongoose');


/**
 * @description Schema for the Game model
 * gameArray is the 2D Array that holds the board
 * accessCode is the unique accessCode given to the user
 * isWinner is a boolean that tells you when somebody has won
 * turn is a string that tells you who's turn it is (Red or Blue)
 */
const GameSchema = new mongoose.Schema({
  gameArray: {
    type: Array,
    required: true,
  },

  accessCode: {
    type: String,
    required: true,
  },

  isWinner: {
    type: Boolean,
    required: true,
  },

  turn: {
    type: String,
    required: true,
  },
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
