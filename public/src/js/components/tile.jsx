import React, { PropTypes } from 'react';

// props that are passed down
const propTypes = {
  value: PropTypes.number.isRequired,
};

// checks the value of the specific [col][row] that is sent
// if '1' then its red, if '-1' then its blue, otherwise it is ''
function Tile(props) {
  let chipColor;
  if (props.value > 0) {
    chipColor = 'red';
  } else if (props.value < 0) {
    chipColor = 'blue';
  } else {
    chipColor = '';
  }

  // sets the className to the chipColor; styling is does in css/style.less
  return (
    <li className={chipColor} />
  );
}

Tile.propTypes = propTypes;

module.exports = Tile;
