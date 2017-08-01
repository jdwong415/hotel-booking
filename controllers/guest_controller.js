const express = require('express');
const router = express.Router();
const db = require("../models");

router.get('/room/book', function(req, res) {
  db.Room.findAll({
  }).then(function(result) {
    res.render("bookroom", {rooms: result});
  });
});

router.post('/room/book', function(req, res) {
  db.Guest.create({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    phone: req.body.phoneNum,
    email: req.body.email,
    room_number: req.body.room,
    checkin: req.body.checkin,
    checkout: req.body.checkout
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
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    phone: req.body.phoneNum,
    email: req.body.email,
    room_number: req.body.room,
    checkin: req.body.checkin,
    checkout: req.body.checkout
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

router.delete("/room/checkout/:id", function(req, res) {
  // db.Room.findAll({
  //   where: {
  //     id: req.params.id
  //   }
  // }).then(function(result) {
  //   result.forEach(function(val) {
  //     customer.destroy({
  //       where: {
  //         id: val.dataValues.customerId
  //       }
  //     });
  //   });
  //   res.redirect("/");
  // });
});

router.get('/guest', function(req, res) {
  res.render("guest");
});

module.exports = router;