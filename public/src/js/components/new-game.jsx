import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

const propTypes = {
  dispatch: PropTypes.func,
};

/**
 * [NewGame description]
 * @type {Class}
 * @description This is the component that will render for the /new route
 * will allow you to enter your name and then dispatches a post request to create
 * a new game in the database and return the game and an access code
 */
class NewGame extends React.Component {
  constructor() {
    super();
    this.newGame = this.newGame.bind(this);
  }

  // trigger when the new game form is submitted
  // this will dispatch the post request action to start a new game
  // and after, will redirect you to /public/build/#/game
  newGame(event) {
    event.preventDefault();
    const promise = new Promise((res) => {
      res(this.props.dispatch(actions.newGame(this.name.value)));
    });

    promise.then(
      window.location.href = '/#/game'
    );
  }

  render() {
    return (
      <div>
        <h2>Enter your name:</h2>
        <form onSubmit={this.newGame}>
          <input type="text" ref={(name) => { this.name = name; }} required />
          <button type="submit">Start Game</button>
        </form>
      </div>
    );
  }
}

NewGame.propTypes = propTypes;

module.exports = connect()(NewGame);
