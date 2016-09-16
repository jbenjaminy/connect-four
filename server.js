const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
const config = require('./config');

const newGame = require('./game').newGame;
const join = require('./game').join;
const find = require('./game').find;
const restart = require('./game').restart;
const add = require('./game').add;
// const share = require('./twilio');

app.use(express.static('./public/build'));

// SOCKET CONNECTIONS
io.on('connection', function(socket) {
  console.log("Socket connected: " + socket.id);
  socket.on('action', (action) => {
    if (action.type === 'server/newGame') {
      const promise = newGame(action.data);
      promise.then((game) => {
        socket.emit('action', {type:'update', data: game});
      });
    }
    if (action.type === 'server/joinGame') {
      const promise = join(action.data);
      promise.then((game) => {
        socket.emit('action', {type:'update', data: game });
      });
    }
    if (action.type === 'server/findGame') {
      const promise = find(action.data);
      promise.then((game) => {
        socket.emit('action', {type:'update', data: game });
      });
    }
    if (action.type === 'server/resetGame') {
      const promise = restart(action.data);
      promise.then((game) => {
        socket.emit('action', {type:'update', data: game });
      });
    }
    if (action.type === 'server/addChip') {
      const promise = add(action.data);
      promise.then((game) => {
        socket.emit('action', {type:'update', data: game });
      });
    }
    // if (action.type === 'server/shareCode') {
    //   const promise = share(action.data);
    //   promise.then((message) => {
    //     socket.emit('action', {type:'sent', data: message });
    //   });
    // }
  });
});

// RUN SERVER FUNCTION
function runServer(callback) {
  mongoose.connect(config.DATABASE_URL, (err) => {
    if (err && callback) {
      return callback(err);
    }

    server.listen(config.PORT, () => {
      console.log(`Listening on localhost: ${config.PORT}`);
      if (callback) {
        callback();
      }
    });
  });
}

if (require.main === module) {
  runServer((err) => {
    if (err) {
      throw new Error(err);
    }
  });
}

exports.app = app;
exports.runServer = runServer;