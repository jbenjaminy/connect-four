import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import SplashPage from './components/splash-page';
import Game from './components/game';
import NewGame from './components/new-game';
import JoinGame from './components/join-game';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={SplashPage} />
    <Route path="/game" component={Game} />
    <Route path="/new" component={NewGame} />
    <Route path="/join" component={JoinGame} />
  </Router>
);

module.exports = routes;
