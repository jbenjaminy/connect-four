import React from 'react';

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

module.exports = Tile;
