const express = require('express');
const router = express.Router();
const db = require("../models");

router.get('/', function(req, res) {
  res.redirect('/index');
});

module.exports = router;