import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

const propTypes = {
  dispatch: PropTypes.func,
};

/**
 * [ResumeGame description]
 * @type {Class}
 * @description This is the component that will render for the /resume route
 * will allow you to enter an access code and then dispatches a get request to
 * load the details of an on-going game.
 */
class ResumeGame extends React.Component {
  constructor() {
    super();
    this.resumeGame = this.resumeGame.bind(this);
  }

  // trigger when the new game form is submitted
  // this will dispatch the post request action to start a new game
  // and after, will redirect you to /public/build/#/game
  resumeGame(event) {
    event.preventDefault();
    const promise = new Promise((res) => {
      res(this.props.dispatch(actions.fetchGame(this.code.value)));
    });

    promise.then(
      window.location.href = '/#/game'
    );
  }

  render() {
    return (
      <div>
        <h2>Access Code:</h2>
        <form onSubmit={this.resumeGame}>
          <input type="text" ref={(code) => { this.code = code; }} required />
          <button type="submit">Resume Game</button>
        </form>
      </div>
    );
  }
}

ResumeGame.propTypes = propTypes;

module.exports = connect()(ResumeGame);