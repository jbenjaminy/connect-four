const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
const config = require('./config');

const newGame = require('./game');
const join = require('./game');
const find = require('./game');
const restart = require('./game');
const add = require('./game');
const share = require('./twilio');

app.use(express.static('./public/build'));

// SOCKET CONNECTIONS
io.on('connection', function(socket) {
  console.log("Socket connected: " + socket.id);
  socket.on('action', (action) => {
    if(action.type === 'server/newGame') {
      let game = newGame(action.data);
      socket.emit('action', {type:'update', data: game});
    }
    if(action.type === 'server/joinGame') {
      let game = join(action.data);
      socket.emit('action', {type:'update', data: game });
    }
    if(action.type === 'server/findGame') {
      let game = find(action.data);
      socket.emit('action', {type:'update', data: game });
    }
    if(action.type === 'server/resetGame') {
      let game = restart(action.data);
      socket.emit('action', {type:'update', data: game });
    }
    if(action.type === 'server/addChip') {
      let game = add(action.data);
      socket.emit('action', {type:'update', data: game });
    }
    if(action.type === 'server/shareCode') {
      let message = share(action.data);
      socket.emit('action', {type:'sent', data: message });
    }
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