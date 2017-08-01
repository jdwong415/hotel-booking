const express = require('express');
const router = express.Router();
const db = require("../models");

router.get('/book', function(req, res) {
  db.Room.findAll({
  }).then(function(result) {
    res.render("bookroom", {rooms: result});
  });
});

router.post('/book', function(req, res) {
  db.Guest.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    phone: req.body.phoneNum,
    email: req.body.email,
    room_number: req.body.room
  }).then(function(result) {
    db.Room.update({
      GuestId: result.dataValues.id,
      available: false
    }, {
      where: {
        id: req.body.room
      }
    }).then(function(result) {
      res.redirect("/guest");
    });
  });
});

router.get('/guest', function(req, res) {
  res.render("guest");
});

module.exports = router;