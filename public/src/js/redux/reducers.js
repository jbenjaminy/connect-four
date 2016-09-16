function reducer(state = {}, action) {
  switch (action.type) {
    case 'update': {
      console.log('game -->', action.data);
      return Object.assign({}, state, {
        turn: action.data.turn,
        gameArray: action.data.gameArray,
        winner: action.data.isWinner,
        accessCode: action.data.accessCode,
        players: action.data.players
      });
    }
    case 'sent': {
      return state;
    }
    default: {
      return state;
    }
  }
}

module.exports = reducer;
