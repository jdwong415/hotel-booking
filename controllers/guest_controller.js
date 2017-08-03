const express = require('express');
const router = express.Router();
const db = require("../models");

router.get('/room/book', function(req, res) {
  db.Room.findAll({
  }).then(function(result) {
    res.render("bookroom", {rooms: result});
  });
});

router.get('/room/book/id/:id', function(req, res) {
  db.Room.findAll({
    where: {
      id: req.params.id
    }
  }).then(function(result) {
    res.render("book-id", {rooms: result});
  });
});

router.post('/room/book/id/:id', function(req, res) {
  db.Guest.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
    room_number: req.body.room,
    checkin: req.body.checkin,
    checkout: req.body.checkout
  }).then(function(result1) {
    db.Room.update({
      GuestId: result1.dataValues.id,
      available: false
    }, {
      where: {
        id: req.body.room
      }
    }).then(function(result) {
      res.redirect("/admin/rooms/id/" + req.body.room);
    });
  });
});

router.put("/guest/checkout", function(req, res) {
  req.session.destroy(function(err) {
    db.Room.update({
      available: true,
      checkin: false
    }, {
      where: {
        GuestId: req.user.id
      }
    }).then(function(result) {
      db.Guest.destroy({
        where: {
          id: req.user.id
        }
      }).then(function(result2) {
        res.redirect("/");
      });
    });
  });
});

module.exports = router;