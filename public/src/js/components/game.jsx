import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Tile from './tile';
import actions from '../redux/actions';

const propTypes = {
  dispatch: PropTypes.function,
};

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      game: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ],
      turn: 'red',
    };
  }

  isRed(chip) {
    return chip === 1;
  }

  isBlue(chip) {
    return chip === -1;
  }

  addChip(col) {
    const gameArray = [];
    this.state.game.forEach((column) => {
      gameArray.push(column.slice());
    });

    this.props.dispatch(actions.addChip({
      gameArray,
      col,
    }));
/*
    for (let i = 5; i >= 0; i--) {
      if (!gameArray[col][i]) {
        if (this.state.turn === 'red') {
          gameArray[col][i] = 1;
          this.setState({
            game: gameArray,
            turn: 'blue',
          });

          this.checkChip(i, col, this.isRed);
          return true;
        } else {
          gameArray[col][i] = -1;
          this.setState({
            game: gameArray,
            turn: 'red',
          });

          this.checkChip(i, col, this.isBlue);
          return true;
        }
      }
    }

    return false;
  }

  checkChip(row, col, isMyChip) {
    let chipsConnected = 1;

    // checks down directions only
    for (let i = 1; i < 4; i++) {
      if (row + i <= 5) {
        if (isMyChip(this.state.game[col][row + i])) {
          chipsConnected++;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    if (chipsConnected >= 4) {
      return alert('you win');
    }

    chipsConnected = 1;
    // checks horizontal forwards
    for (let i = 1; i < 4; i++) {
      if (col + i <= 6) {
        if (isMyChip(this.state.game[col + i][row])) {
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
        if (isMyChip(this.state.game[col - i][row])) {
          chipsConnected++;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    if (chipsConnected >= 4) {
      return alert('you win');
    }

    // checks diagnol forwards
    chipsConnected = 1;

    for (let i = 1; i < 4; i++) {
      if (col + i <= 6 && row - i >= 0) {
        if (isMyChip(this.state.game[col + i][row - i])) {
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
        if (isMyChip(this.state.game[col - i][row + i])) {
          chipsConnected++;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    if (chipsConnected >= 4) {
      return alert('you win');
    }

    // checks diagnol backwards
    chipsConnected = 1;

    for (let i = 1; i < 4; i++) {
      if (col - i >= 0 && row - i >= 0) {
        if (isMyChip(this.state.game[col - i][row - i])) {
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
        if (isMyChip(this.state.game[col + i][row + i])) {
          chipsConnected++;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    if (chipsConnected >= 4) {
      return alert('you win');
    }
    */
  }

  render() {
    const game = [];

    this.state.game.forEach((col, colIdx) => {
      const column = [];
      col.forEach((row, rowIdx) => {
        column.push(<Tile value={row} key={rowIdx} />);
      });

      game.push(
        <ul
          className="game-column"
          key={colIdx}
          onClick={() => { this.addChip(colIdx); }}
        >
          {column}
        </ul>
      );
    });

    return (
      <div className="flex-container">
        <h2>Players:</h2>
        <h2>Access Code:</h2>
        <h1>Connect Four with Friends</h1>
        <button>New Game</button>
        <section className="game">
          {game}
        </section>
      </div>
    );
  }
}

Game.propTypes = propTypes;

const Container = connect()(Game);

module.exports = Container;
