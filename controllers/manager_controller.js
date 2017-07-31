const express = require('express');
const router = express.Router();
const db = require("../models");

router.get('/admin/rooms', function(req, res) {
  db.Room.findAll({}).then(function(result) {
    res.render("rooms", {rooms: result});
  });
});

module.exports = router;