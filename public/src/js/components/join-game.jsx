import React from 'react';

class JoinGame extends React.Component {
  constructor() {
    super();
    this.joinGame = this.joinGame.bind(this);
  }

  joinGame(event) {
    event.preventDefault();
    console.log(this.name.value);
    console.log(this.code.value);
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

module.exports = JoinGame;
