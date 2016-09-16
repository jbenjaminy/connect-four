import React from 'react';
import { Link } from 'react-router';

/**
 * [SplashPage description]
 * @type {Function}
 * @description This is the splash page component that will render in the '/' route
 */
function SplashPage() {
  return (
    <section className="splash-container">
      <div className="splash-page">
        <h1>Connect Four with Friends</h1>
        <div>
          <Link to="/new">
            <button>New Game</button>
          </Link>
          <Link to="/join">
            <button>Join Game</button>
          </Link>
          <Link to="/resume">
            <button>Resume Game</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

module.exports = SplashPage;
