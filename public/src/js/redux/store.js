import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io('');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/").default;

let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

// store.subscribe(()=>{
//   console.log('new client state', store.getState());
// });


export default store;

