import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Tile from './tile';
import actions from '../redux/actions';

const propTypes = {
  dispatch: PropTypes.func,
  game: PropTypes.object,
};

class Game extends React.Component {
  constructor() {
    super();
    this.addChip = this.addChip.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchGame('asdf1234'));
  }

  newGame() {
    this.props.dispatch(actions.newGame({
      turn: this.props.game.turn,
    }));
  }

  addChip(col) {
    const gameArray = [];

    this.props.game.gameArray.forEach((column) => {
      gameArray.push(column.slice());
    });

    this.props.dispatch(actions.addChip({
      gameArray,
      col,
      turn: this.props.game.turn,
    }));
  }

  render() {
    const game = [];
    console.log(this.props.game);
    if (this.props.game.gameArray) {
      this.props.game.gameArray.forEach((col, colIdx) => {
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
    }

    return (
      <div className="flex-container">
        <h2>Players:</h2>
        <h2>Access Code:</h2>
        <h1>Connect Four with Friends</h1>
        <button onClick={this.newGame}>New Game</button>
        <section className="game">
          {game}
        </section>
      </div>
    );
  }
}

Game.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    game: state,
  };
};

const Container = connect(mapStateToProps)(Game);

module.exports = Container;
