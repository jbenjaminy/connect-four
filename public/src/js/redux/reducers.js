import actions from './actions';

function reducer(state = {}, action) {
  if (action.type === actions.FETCH_GAME_SUCCESS) {
    return Object.assign({}, state, {
      turn: action.game.turn,
      gameArray: action.game.game,
      winner: action.game.isWinner,
    });
  }

  if (action.type === actions.ADD_CHIP_SUCCESS) {
    return Object.assign({}, state, {
      turn: action.game.turn,
      gameArray: action.game.gameArray,
      winner: action.game.isWinner,
    });
  }

  return state;
}

module.exports = reducer;
