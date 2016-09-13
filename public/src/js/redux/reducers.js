import actions from './actions';

function reducer(state = {}, action) {
  if (action.type === actions.FETCH_GAME_SUCCESS) {
    return Object.assign({}, state, {
      turn: action.turn,
      gameArray: action.gameArray,
      winner: action.isWinner,
    });
  }

  if (action.type === actions.ADD_CHIP_SUCCESS) {
    const turn = action.turn === 'red' ? 'blue' : 'red';

    return Object.assign({}, state, {
      turn,
      gameArray: action.gameArray,
      winner: action.isWinner,
    });
  }
}

module.exports = reducer;
