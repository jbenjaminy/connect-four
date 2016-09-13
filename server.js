const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const jsonParser = bodyParser.json();

// RUN SERVER FUNCTION
function runServer(callback) {
  mongoose.connect(config.DATABASE_URL, (err) => {
    if (err && callback) {
      return callback(err);
    }

    app.listen(config.PORT, () => {
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

app.use(passport.initialize());
app.use(express.static('./public/build'));
app.use(jsonParser);

// app.use('/auth', auth);
// app.use('/questions', questions);
// app.use('/users', users);

exports.app = app;
exports.runServer = runServer;
