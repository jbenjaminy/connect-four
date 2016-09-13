const express = require('express');
const Game = require('../models/game');

const router = express.Router();

router.post('/', (req, res) => {
  console.log('in here');
});

module.exports = router;
