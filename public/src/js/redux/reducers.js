let initialState = {
  players: {},
  gameArray: [],
  accessCode: '',
  turn: '',
  winner: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'update': {
      return Object.assign({}, state, {
        turn: action.data.turn,
        gameArray: action.data.gameArray,
        winner: action.data.isWinner,
        accessCode: action.data.accessCode,
        players: action.data.players
      });
    }
    // case 'sent': {
    //   return state;
    // }
    default: {
      return state;
    }
  }
}

module.exports = reducer;
