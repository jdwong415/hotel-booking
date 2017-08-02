const express = require('express');
const router = express.Router();
const db = require("../models");

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;