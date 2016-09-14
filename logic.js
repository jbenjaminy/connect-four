let connectFour = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

function isRed(chip) {
  return chip === 1;
}

function isBlue(chip) {
  return chip === -1;
}

addChip(col, player) {
  for (let i = 5; i >= 0; i--) {
    if (!connectFour[i][col]) {
      if (player === 1) {
        connectFour[i][col] = 1;
        checkChip(i, col, isRed);
        return true;
      } else {
        connectFour[i][col] = -1;
        checkChip(i, col, isBlue);
        return true;
      }
    }
  }

  return false; 
}

function checkChip(row, col, isMyChip) {
  let chipsConnected = 1;

  // checks down directions only
  for (let i = 1; i < 4; i++) {
    if (row + i <= 5) {
      if (isMyChip(connectFour[row + i][col])) {
        chipsConnected++;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  if (chipsConnected === 4) {
    return console.log('you win');
  }

  chipsConnected = 1;
  // checks horizontal forwards
  for (let i = 1; i < 4; i++) {
    if (col + i <= 6) {
      if (isMyChip(connectFour[row][col + i])) {
        chipsConnected++;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  // checks horizontal backwards
  for (let i = 1; i < 4; i++) {
    if (col - i >= 0) {
      if (isMyChip(connectFour[row][col - i])) {
        chipsConnected++;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  if (chipsConnected === 4) {
    return console.log('you win');
  }

  // checks diagnol forwards
  chipsConnected = 1;

  for (let i = 1; i < 4; i++) {
    if (col + i <= 6 && row - i >= 0) {
      if (isMyChip(connectFour[row - i][col + i])) {
        chipsConnected++;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  for (let i = 1; i < 4; i++) {
    if (col - i >= 0 && row + i <= 5) {
      if (isMyChip(connectFour[row + i][col - i])) {
        chipsConnected++;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  if (chipsConnected === 4) {
    return console.log('you win');
  }

  // checks diagnol backwards
  chipsConnected = 1;

  for (let i = 1; i < 4; i++) {
    if (col - i >= 0 && row - i >= 0) {
      if (isMyChip(connectFour[row - i][col - i])) {
        chipsConnected++;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  for (let i = 1; i < 4; i++) {
    if (col + i <= 6 && row + i <= 5) {
      if (isMyChip(connectFour[row + i][col + i])) {
        chipsConnected++;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  if (chipsConnected === 4) {
    return console.log('you win');
  }
}
