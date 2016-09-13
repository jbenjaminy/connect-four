import actions from './actions';

function reducer(state = {}, action) {
  switch (action.type) {
    case actions.FETCH_GAME_SUCCESS:
    case actions.ADD_CHIP_SUCCESS:
    case actions.NEW_GAME_SUCCESS: {
      return Object.assign({}, state, {
        turn: action.game.turn,
        gameArray: action.game.gameArray,
        winner: action.game.isWinner,
      });
    }

    case actions.FETCH_GAME_ERROR:
    case actions.ADD_CHIP_ERROR:
    case actions.NEW_GAME_ERROR: {
      return state;
    }

    default: {
      return state;
    }
  }
}

module.exports = reducer;
