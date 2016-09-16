import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
  dispatch: PropTypes.func,
};

/**
 * [JoinGame description]
 * @type {Class}
 * @description This is the component that will render for the /join route
 * Will allow you to enter your name and your accesscode to join the correct game
 * and add you as 'Player Two'.
 */
class JoinGame extends React.Component {
  constructor() {
    super();
    this.joinGame = this.joinGame.bind(this);
  }

  joinGame(event) {
    event.preventDefault();
    const promise = new Promise((res) => {
      res(this.props.dispatch({
        type: 'server/joinGame',
        data: {
          accessCode: this.code.value,
          playerTwo: this.name.value
        }
      }));
    });
    promise.then(
      window.location.href = '/#/game'
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.joinGame}>
          <h2>Enter your name:</h2>
          <input type="text" ref={(name) => { this.name = name; }} required />

          <h2>Access Code:</h2>
          <input type="text" ref={(code) => { this.code = code; }} required />

          <button type="submit">Join Game</button>
        </form>
      </div>
    );
  }
}

JoinGame.propTypes = propTypes;

module.exports = connect()(JoinGame);
