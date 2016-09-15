import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Tile from './tile';
import actions from '../redux/actions';

/**
 * [propTypes description]
 * @type {Object}
 * @description holds all the props for this class
 * game is the object that holds the state
 */
const propTypes = {
  dispatch: PropTypes.func,
  game: PropTypes.object,
};

/**
 * [Game description]
 * @type {Class}
 * @description This is the main game component that holds
 * the /game route
 */
class Game extends React.Component {
  // function binding must be done in the constructor
  constructor() {
    super();
    this.addChip = this.addChip.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.sendCode = this.sendCode.bind(this);
    this.inputBox = this.inputBox.bind(this);
  }

  // after the component mounts, it will dispatch the fetch
  // request and pass in the accessCode stored in the state
  componentDidMount() {
    this.props.dispatch(actions.fetchGame(this.props.game.accessCode));
  }

  inputBox() {
    this.props.dispatch(actions.addInputBox());
  }
  // resetGame is attached to the "New Game" button in the game page
  // it will dispatch the put request with the current user turn and
  // the accesscode to reset the correct game
  resetGame() {
    this.props.dispatch(actions.resetGame({
      turn: this.props.game.turn,
    }, this.props.game.accessCode));
  }

  /**
   * addChip is triggered anytime a column is clicked in the game
   * @param {number} col
   * @param {string} accessCode
   */
  addChip(col, accessCode) {
    const gameArray = [];

    // this is to copy the 2D array without mutating it
    // this.props.game = state
    this.props.game.gameArray.forEach((column) => {
      gameArray.push(column.slice());
    });

    // if there is no winner, dispatch the addChip action
    // if there is a winner, you cannot add another chip
    if (!this.props.game.winner) {
      this.props.dispatch(actions.addChip({
        accessCode,
        gameArray,
        col,
        turn: this.props.game.turn,
        players: this.props.game.players
      }));
    }
  }

  sendCode(event) {
    event.preventDefault();
    const promise = new Promise((res) => {
      res(this.props.dispatch(actions.sendCode(this.number.value, this.props.game.accessCode)));
    });

    // promise.then(
    //   console.log('code sent successfully')
    // );
  }

  render() {
    // was getting error 'this.props.game.turn is undefined', 
    // so added this here and was then able to get rid 
    // of the 'if (this.props.game.gameArray) statement above line 90'
    if (!this.props.game.turn) {
      return null;
    }

    // if (this.props.game.inputBox) {
    //   return (
    //     <div className="flex-container">
    //       <div className='player-one'><h2>Player One: {this.props.game.players.Red}</h2>&nbsp;&nbsp;<ul><Tile value={1}/></ul></div>
    //       <div className='player-two'><h2>Player Two: {this.props.game.players.Blue}</h2>&nbsp;&nbsp;<ul><Tile value={-1}/></ul></div>
    //       <form onSubmit={this.sendCode}>
    //         <input type='text' className='input-box' placeholder='Enter 10-digit phone number' ref={(number) => { this.number = number; }} required />
    //         <button type="submit">Send Code</button>
    //       </form>
    //       <h1>Connect Four with Friends</h1>
    //       <button onClick={this.resetGame}>New Game</button>
    //       <h2>{message}</h2>
    //       <section className="game">
    //         {game}
    //       </section>
    //     </div>
    //   );
    // }
    // winner constant will be set to the last persons turn because
    // turn changes are handled in the backend. backend responds with the new turn
    // rather than the winner's turn and a boolean for if a winner was detected
    const winner = this.props.game.turn === 'Red' ? 'Blue' : 'Red';

    // will set the display message for who won if so, if not, who's turn it is
    const message = this.props.game.winner ? `${this.props.game.players[winner]} wins` : `${this.props.game.players[this.props.game.turn]}'s Turn`;

    // empty game array
    const game = [];

    // will loop through each of the col's
    this.props.game.gameArray.forEach((col, colIdx) => {
      const column = [];

      // will loop through each row in the col and push the tile into the column array
      col.forEach((row, rowIdx) => {
        column.push(<Tile value={row} key={rowIdx} />);
      });

      // once a column is finished, it will be pushed into the game array (full board)
      game.push(
        <ul
          className="game-column"
          key={colIdx}
          onClick={() => { this.addChip(colIdx, this.props.game.accessCode); }}
        >
          {column}
        </ul>
      );
    });


    return (
      <div className="flex-container">
        <div className='player-one'><h2>Player One: {this.props.game.players.Red}</h2>&nbsp;&nbsp;<ul><Tile value={1}/></ul></div>
        <div className='player-two'><h2>Player Two: {this.props.game.players.Blue}</h2>&nbsp;&nbsp;<ul><Tile value={-1}/></ul></div>
        <h2 className='access-code'>Access Code: {this.props.game.accessCode}</h2>
        <h2 className='share'>Share Access Code:</h2>&nbsp;&nbsp;<form onSubmit={this.sendCode} className='form'><input type='text' className='input-box' placeholder='Enter 10-digit phone number' ref={(number) => { this.number = number; }} required /><button type="submit">Send Code</button></form>
        <h1>Connect Four with Friends</h1>
        <button onClick={this.resetGame}>New Game</button>
        <h2>{message}</h2>
        <section className="game">
          {game}
        </section>
      </div>
    );
  }
}

// just to get the propTypes linked
Game.propTypes = propTypes;

// mapping our whole state to this.props.game
const mapStateToProps = (state) => {
  return {
    game: state,
  };
};

const Container = connect(mapStateToProps)(Game);

module.exports = Container;
