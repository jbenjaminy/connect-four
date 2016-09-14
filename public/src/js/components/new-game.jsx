import React from 'react';

class NewGame extends React.Component {
  constructor() {
    super();
    this.startGame = this.startGame.bind(this);
  }

  startGame(event) {
    event.preventDefault();
    console.log(this.name.value);
  }

  render() {
    return (
      <div>
        <h2>Enter your name:</h2>
        <form onSubmit={this.startGame}>
          <input type="text" ref={(name) => { this.name = name; }} required />
          <button type="submit">Start Game</button>
        </form>
      </div>
    );
  }
}

module.exports = NewGame;
