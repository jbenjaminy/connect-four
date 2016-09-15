import actions from './actions';

// default state is {}
// for all successes, will set the state to the following parts of the returned obj
// for all errors, will return state
function reducer(state = {}, action) {
  switch (action.type) {
    case actions.FETCH_GAME_SUCCESS:
    case actions.ADD_CHIP_SUCCESS:
    case actions.RESET_GAME_SUCCESS:
    case actions.NEW_GAME_SUCCESS:
    case actions.JOIN_GAME_SUCCESS: {
      console.log('game -->', action.game);
      return Object.assign({}, state, {
        turn: action.game.turn,
        gameArray: action.game.gameArray,
        winner: action.game.isWinner,
        accessCode: action.game.accessCode,
        players: action.game.players,
        inputBox: false
      });
    }

    case actions.FETCH_GAME_ERROR:
    case actions.ADD_CHIP_ERROR:
    case actions.RESET_GAME_ERROR:
    case actions.NEW_GAME_ERROR: 
    case actions.JOIN_GAME_ERROR: 
    case actions.SEND_CODE_ERROR: {
      return state;
    }

    // case actions.ADD_INPUT_BOX: {
    //   return Object.assign({}, state, {
    //     inputBox: true
    //   });
    // }

    case actions.SEND_CODE_SUCCESS: {
      return state;
    }

    default: {
      return state;
    }
  }
}

module.exports = reducer;
