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

function makeCode() {
  let code = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 6; i += 1) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return new Promise((resolve, reject) => {
    Game.find({ accessCode: code }, (err, game) => {
      if (err) {
        reject(err);
      }

      if (!game.length) {
        resolve(code);
      }

      return makeCode();
    });
  });
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

router.delete('/:accessCode', (req, res) => {
  const accessCode = req.params.accessCode;

  Game.findOneAndRemove({ accessCode }, (err, game) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json(game);
  });
});

router.get('/', (req, res) => {
  Game.find({}, (err, games) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json(games);
  });
});

router.post('/', (req, res) => {
  const promise = makeCode();

  promise.then((accessCode) => {
    Game.create({
      accessCode,
      gameArray: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ],
      isWinner: false,
      turn: 'Red',
    }, (err, game) => {
      if (err) {
        return res.status(400).json(err);
      }

      return res.status(201).json(game);
    });
  });
});

router.put('/', (req, res) => {
  const gameArray = req.body.gameArray;
  const col = req.body.col;
  let turn = req.body.turn;
  let isWinner;
  let isAdded = false;

  for (let i = 5; i >= 0; i -= 1) {
    if (!gameArray[col][i]) {
      if (turn === 'Red') {
        gameArray[col][i] = 1;
        isWinner = checkChip(i, col, isRed, gameArray);
      } else {
        gameArray[col][i] = -1;
        isWinner = checkChip(i, col, isBlue, gameArray);
      }

      isAdded = true;
      break;
    }
  }

  if (isAdded) {
    turn = turn === 'Red' ? 'Blue' : 'Red';
    Game.findOneAndUpdate({
      accessCode: 'asdf1234',
    }, {
      isWinner,
      turn,
      gameArray,
    }, { new: true }, (err, game) => {
      if (err) {
        return res.status(400).json(err);
      }

      return res.status(200).json({
        isWinner: game.isWinner,
        turn: game.turn,
        gameArray: game.gameArray,
      });
    });
  }
});

router.put('/new/:accessCode', (req, res) => {
  const accessCode = req.params.accessCode;
  const turn = req.body.turn === 'Red' ? 'Blue' : 'Red';

  Game.findOneAndUpdate({
    accessCode,
  }, {
    turn,
    gameArray: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    isWinner: false,
  }, { new: true }, (err, game) => {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(200).json(game);
  });
});

module.exports = router;
