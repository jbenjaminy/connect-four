const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  game: {
    type: Array,
    required: true,
  },

  accessCode: {
    type: String,
    required: true,
  },
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
