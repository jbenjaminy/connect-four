import React from 'react';
import { Link } from 'react-router';

/**
 * [SplashPage description]
 * @type {Function}
 * @description This is the splash page component that will render in the '/' route
 */
function SplashPage() {
  return (
    <div>
      <h1>Connect Four with Friends</h1>
      <Link to="/new">
        <button>New Game</button>
      </Link>
      <Link to="/join">
        <button>Join Game</button>
      </Link>
    </div>
  );
}

module.exports = SplashPage;
