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



  addChip(col) {
    const gameArray = [];
    this.state.game.forEach((column) => {
      gameArray.push(column.slice());
    });

    this.props.dispatch(actions.addChip({
      gameArray,
      col,
      turn: this.state.turn,
    }));
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
