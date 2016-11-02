import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router'


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
      console.log('in join game promise');
      res(this.props.dispatch({
        type: 'server/joinGame',
        data: {
          accessCode: this.code.value,
          playerTwo: this.name.value
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
          <form onSubmit={this.joinGame}>
            <div>
              <h2>Enter your name:</h2>
              <input type="text" ref={(name) => { this.name = name; }} required />
            </div>
            <div>
              <h2>Access Code:</h2>
              <input type="text" ref={(code) => { this.code = code; }} required />
            </div>
            <button type="submit">Join Game</button>
          </form>
        </div>
      </section>
    );
  }
}

JoinGame.propTypes = propTypes;

const mapStateToProps = (state) => {
    return {
        accessCode: state.accessCode
    };
};

module.exports = connect()(JoinGame);
