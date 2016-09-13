import React, { PropTypes } from 'react';

const propTypes = {
  value: PropTypes.number.isRequired,
};

function Tile(props) {
  let chipColor;
  if (props.value > 0) {
    chipColor = 'red';
  } else if (props.value < 0) {
    chipColor = 'blue';
  } else {
    chipColor = '';
  }

  return (
    <li className={chipColor} />
  );
}

Tile.propTypes = propTypes;

module.exports = Tile;
