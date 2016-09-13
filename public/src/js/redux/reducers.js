import actions from './actions';

function reducer(state = {}, action) {
  if (action.type === actions.ADD_CHIP_SUCCESS) {
    const turn = action.turn === 'red' ? 'blue' : 'red';

    return Object.assign({}, state, {
      turn,
      gameArray: action.gameArray,
    });
  }
}

module.exports = reducer;
