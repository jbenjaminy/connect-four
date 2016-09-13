const mongoose = require('mongoose');

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
