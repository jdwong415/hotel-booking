const express = require('express');
const router = express.Router();
const db = require("../models");

router.get('/room/book', function(req, res) {
  db.Room.findAll({
  }).then(function(result) {
    res.render("bookroom", {rooms: result});
  });
});

module.exports = router;