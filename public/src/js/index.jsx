import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Game from './components/game.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Game />,
    document.getElementById('app')
  );
});
