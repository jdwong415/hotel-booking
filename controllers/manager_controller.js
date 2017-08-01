const express = require('express');
const router = express.Router();
const db = require("../models");

router.get('/admin/rooms', function(req, res) {
  db.Room.findAll({}).then(function(result) {
    res.render("rooms", {
      rooms: result
    });
  });
});

router.post('/admin/rooms', function(req, res) {
  db.Guest.findAll({
    where: {
      last_name: req.body.name
    }
  }).then(function(result) {
    res.json(result);
  });
});

router.get('/admin/rooms/id/:id', function(req, res) {
  db.Room.findAll({
    where: {
      id: req.params.id
    },
    include: [db.Guest]
  }).then(function(result) {
    res.render("room", {
      rooms: result
    });
  });
});

router.put("/room/checkin/:id", function(req, res) {
  db.Room.update({
    checkin: true
  }, {
    where: {
      id: req.params.id
    }
  }).then(function(result) {
    res.redirect("/admin/rooms/id/" + req.params.id);
  });
});

module.exports = router;