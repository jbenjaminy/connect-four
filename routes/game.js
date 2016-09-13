const express = require('express');
const Game = require('../models/game');

const router = express.Router();

function isRed(chip) {
  return chip === 1;
}

function isBlue(chip) {
  return chip === -1;
}

function checkChip(row, col, isMyChip, game) {
  let chipsConnected = 1;

  // checks down directions only
  for (let i = 1; i < 4; i += 1) {
    if (row + i <= 5) {
      if (isMyChip(game[col][row + i])) {
        chipsConnected += 1;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  if (chipsConnected >= 4) {
    return true;
  }

  chipsConnected = 1;
  // checks horizontal forwards
  for (let i = 1; i < 4; i += 1) {
    if (col + i <= 6) {
      if (isMyChip(game[col + i][row])) {
        chipsConnected += 1;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  // checks horizontal backwards
  for (let i = 1; i < 4; i += 1) {
    if (col - i >= 0) {
      if (isMyChip(game[col - i][row])) {
        chipsConnected += 1;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  if (chipsConnected >= 4) {
    return true;
  }

  // checks diagnol forwards
  chipsConnected = 1;

  for (let i = 1; i < 4; i += 1) {
    if (col + i <= 6 && row - i >= 0) {
      if (isMyChip(game[col + i][row - i])) {
        chipsConnected += 1;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  for (let i = 1; i < 4; i += 1) {
    if (col - i >= 0 && row + i <= 5) {
      if (isMyChip(game[col - i][row + i])) {
        chipsConnected += 1;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  if (chipsConnected >= 4) {
    return true;
  }

  // checks diagnol backwards
  chipsConnected = 1;

  for (let i = 1; i < 4; i += 1) {
    if (col - i >= 0 && row - i >= 0) {
      if (isMyChip(game[col - i][row - i])) {
        chipsConnected += 1;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  for (let i = 1; i < 4; i += 1) {
    if (col + i <= 6 && row + i <= 5) {
      if (isMyChip(game[col + i][row + i])) {
        chipsConnected += 1;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  if (chipsConnected >= 4) {
    return true;
  }

  return false;
}

router.get('/:accessCode', (req, res) => {
  const accessCode = req.params.accessCode;

  Game.find({ accessCode }, (err, game) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json(game[0]);
  });
});

router.post('/', (req, res) => {
  Game.create({
    game: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    accessCode: req.body.accessCode,
  }, (err, game) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(201).json(game);
  });
});

router.put('/', (req, res) => {
  const gameArray = req.body.gameArray;
  const col = req.body.col;
  const turn = req.body.turn;

  for (let i = 5; i >= 0; i -= 1) {
    if (!gameArray[col][i]) {
      let isWinner;

      if (turn === 'red') {
        gameArray[col][i] = 1;
        isWinner = checkChip(i, col, isRed, gameArray);
      } else {
        gameArray[col][i] = -1;
        isWinner = checkChip(i, col, isBlue, gameArray);
      }

      return res.status(200).json({
        isWinner,
        turn,
        gameArray,
      });
    }
  }

  return false;
});

module.exports = router;
