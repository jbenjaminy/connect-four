import React from 'react';
import Tile from './tile';

class Game extends React.Component {
  static isRed(chip) {
    return chip === 1;
  }

  static isBlue(chip) {
    return chip === -1;
  }

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

  addChip(col) {
    const gameArray = [];
    this.state.game.forEach((column) => {
      gameArray.push(column.slice());
    });

    for (let i = 5; i >= 0; i--) {
      if (!gameArray[col][i]) {
        if (this.state.turn === 'red') {
          gameArray[col][i] = 1;
          this.setState({
            game: gameArray,
            turn: 'blue',
          });
          // checkChip(i, col, isRed);
          return true;
        } else {
          gameArray[col][i] = -1;
          this.setState({
            game: gameArray,
            turn: 'red',
          });
          // checkChip(i, col, isBlue);
          return true;
        }
      }
    }

    return false;
  }

  checkChip(row, col, isMyChip) {

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

module.exports = Game;
