import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router'

const propTypes = {
  dispatch: PropTypes.func,
};

/**
 * [NewGame description]
 * @type {Class}
 * @description This is the component that will render for the /new route
 * will allow you to enter your name and then dispatches a post request to create
 * a new game in the database and return the game and an access code,
 * adding you as 'Player One'.
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
      console.log('in new game promise');
      res(this.props.dispatch({
        type: 'server/newGame',
        data: {
          playerOne: this.name.value
        }
      }));
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.accessCode !== "") {
      browserHistory.push('/game');
    }
  }

  render() {
    return (
      <section className="splash-container">
        <div className="splash-page">
          <div>
            <h2>Enter your name:</h2>
            <form onSubmit={this.newGame}>
              <input type="text" ref={(name) => { this.name = name; }} required />
              <button type="submit">Start Game</button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

NewGame.propTypes = propTypes;

const mapStateToProps = (state) => {
    return {
        accessCode: state.accessCode
    };
};

module.exports = connect(mapStateToProps)(NewGame);
