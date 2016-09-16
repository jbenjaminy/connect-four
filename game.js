const Game = require('./models/game');

/* ---------------- C.R.U.D. FUNCTIONS ---------------- */
/* FIND GAME BY ACCESS CODE */
let find = (data) => {
  let accessCode = data.accessCode;
  Game.find({ accessCode }, (err, game) => {
    if (err) {
      return console.error(err);
    }
    return game[0];
  });
}

/* FIND ALL GAMES IN DATABASE */
let findAll = () => {
  Game.find({}, (err, games) => {
    if (err) {
      return console.error(err);
    }
    return games;
  });
}

/* CREATE NEW GAME */
let newGame = (data) => {
  let playerOne = data.playerOne;
  // calls makeCode and gets a promise
  const promise = makeCode();
  // once promise has resolved, it will add it to the db with the returned accesscode
  promise.then((accessCode) => {
    Game.create({
      accessCode: accessCode,
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
      players: {'Red': playerOne, 'Blue': 'Blue'}
    }, (err, game) => {
      if (err) {
        return console.error(err);
      }
      return game;
    });
  });
}

/* JOIN GAME BY ACCESS CODE */
let join = (data) => {
  let accessCode = data.accessCode;
  let playerTwo = data.playerTwo;
  const promise = findPromise(accessCode);
  promise.then((game) => {
    let players = game[0].players;
    players.Blue = playerTwo;
    Game.findOneAndUpdate({ accessCode,}, {
      isWinner: game[0].isWinner,
      turn: game[0].turn,
      gameArray: game[0].gameArray,
      players: players
    }, { new: true }, (err, game) => {
      if (err) {
        return console.error(err);
      }
      return game;
    });
  });
}

/* RESTART GAME BY ACCESS CODE */
let restart = (data) => {
  let accessCode = data.accessCode;
  let turn = data.turn;
  // switches current turn to let loser move first
  turn = turn === 'Red' ? 'Blue' : 'Red';

  Game.findOneAndUpdate(
    { accessCode }, {
      turn: turn,
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
      return console.error(err);
    }
    return game;
  });
}

/* DELETE GAME BY ACCESS CODE */
let del = (accessCode) => {
  Game.findOneAndRemove({ accessCode }, (err, game) => {
    if (err) {
      return console.error(err);
    }
    return game;
  });
}

/* ADD CHIP */
let add = (data) => {
  let accessCode = data.accessCode;
  let gameArray = data.gameArray;
  let players = data.players;
  let col = data.col;
  let turn = data.turn;
  // declares variables for scope
  let isWinner;
  let isAdded = false;
  // checks every chip in the column for a free slot starting from the bottom
  for (let i = 5; i >= 0; i -= 1) {
    // if the slot is 0, it will attempt to fill it
    if (!gameArray[col][i]) {
      // if its red's turn, it will fill it with '1' and call checkChip with the 'isRed' func
      // otherwise it will fill it with '-1' and call checkChip with the 'isBlue' func
      if (turn === 'Red') {
        gameArray[col][i] = 1;
        isWinner = checkChip(i, col, isRed, gameArray);
      } else {
        gameArray[col][i] = -1;
        isWinner = checkChip(i, col, isBlue, gameArray);
      }
      // set to true to determine if the move was valid
      isAdded = true;
      break;
    }
  }
  // if chip was added, finds and changes game in db
  if (isAdded) {
    turn = turn === 'Red' ? 'Blue' : 'Red';
    Game.findOneAndUpdate({ accessCode }, {
      isWinner: isWinner,
      turn: turn,
      gameArray: gameArray,
      players: players
    }, { new: true }, (err, game) => {
      if (err) {
        return console.error(err);
      }
      return game;
    });
  }
}
/*----------------- HELPER FUNCTIONS -----------------*/

/* FIND GAME BY ACCESS CODE AS PROMISE */
let findPromise = (code) => {
  return new Promise((resolve, reject) => {
    Game.find({ accessCode: code}, (err, game) => {
      if (err) {
        reject(err);
      }
      if (!game.length) {
        reject(err);
      }
      resolve(game);
    });
  });
}

/* CREATE UNIQUE ACCESS CODE FOR NEW GAMES */
let makeCode = () => {
  // helper function to create a pseudo-random access code
  let code = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // randomizes a number, finds the character at that index and adds it to the code variable
  for (let i = 0; i < 6; i += 1) {
    code += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  // returns a promise that will check the db to see if the code is in use
  return new Promise((resolve, reject) => {
    Game.find({ accessCode: code }, (err, game) => {
      if (err) {
        reject(err);
      }
      // if it is not, it will resolve the code
      if (!game.length) {
        resolve(code);
      }
      // if it is, it will run recursively
      return makeCode();
    });
  });
}

// Helper function to determine what color the chip is by returning true or false
// It will take in the chip as a param and see if it is equal to 1, if so it is red
let isRed = (chip) => {
  return chip === 1;
}

// Helper function to determine what color the chip is by returning true or false
// It will take in the chip as a param and see if it is equal to -1, if so it is blue
let isBlue = (chip) => {
  return chip === -1;
}

/**
 * [checkChip description]
 * @param  {number}  row      [is the row location of the chip we're evaulating]
 * @param  {number}  col      [is the col location of the chip we're evaulating]
 * @param  {Func}   isMyChip  [is the isRed or isBlue function that will be passed in]
 * @param  {array}   game     [is the current game board that needs to be evaluated]
 * @return {Boolean}          [is assigned to isWinner once returned]
 */
let checkChip = (row, col, isMyChip, game) => {
  let chipsConnected = 1; // starts at 1 to include the chip added

  // checks from the current chip added downward
  for (let i = 1; i < 4; i += 1) {
    // if we're still on the board
    if (row + i <= 5) {
      // if the evaluated chip returns true, add to chipsConnected
      if (isMyChip(game[col][row + i])) {
        chipsConnected += 1;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  // evaluates if we found 4 or more in a row
  if (chipsConnected >= 4) {
    return true;
  }

  // resets chipConnected
  chipsConnected = 1;

  // next 2 for loops check the horizontal plane
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

  // resets chipsConnected
  chipsConnected = 1;

  // next 2 for loops evalute the forward slash direction
  // checks diagnol forwards
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

  // checks diagnol backwards
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

  chipsConnected = 1;

  // next 2 for loops evaluate the backslash direction
  // checks diagnol backwards
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

  // if we find no winner, we return false
  return false;
}

/*------------------ EXPORTS ------------------*/
exports.find = find;
exports.findAll = findAll;
exports.newGame = newGame;
exports.join = join;
exports.restart = restart;
exports.del = del;
exports.add = add;
exports.findPromise = findPromise;
exports.makeCode = makeCode;
exports.isBlue = isBlue;
exports.isRed = isRed;
exports.checkChip = checkChip;

