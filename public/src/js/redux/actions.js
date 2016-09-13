import fetch from 'isomorphic-fetch';

const FETCH_GAME_SUCCESS = 'FETCH_GAME_SUCCESS';

const FETCH_GAME_ERROR = 'FETCH_GAME_ERROR';

const ADD_CHIP_SUCCESS = 'ADD_CHIP_SUCCESS';

function addChipSuccess() {
  return {
    type: ADD_CHIP_SUCCESS,
  };
}

const ADD_CHIP_ERROR = 'ADD_CHIP_ERROR';

function addChipError() {
  return {
    type: ADD_CHIP_ERROR,
  };
}

function addChip() {

}
