import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';

const thunk = require('redux-thunk').default;

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
