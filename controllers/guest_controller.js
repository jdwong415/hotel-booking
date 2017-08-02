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
      res.redirect("/guest/" + result1.dataValues.id);
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

router.delete("/guest/checkout/:id", function(req, res) {
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

router.get('/guest/:id', function(req, res) {
  db.Guest.findAll({
    where: {
      id: req.params.id
    },
    include: [db.Room]
  }).then(function(result) {
    res.render("guest", {
      guest: result
    });
  });
});

router.post('/guest/:id', function(req, res) {
  db.Guest.findAll({
    where: {
      email: req.body.email,
      last_name: req.body.lastname,
      room_number: req.body.room
    }
  }).then(function(result) {
    res.redirect('/guest/' + result[0].dataValues.id);
  }).catch(function(err) {
    res.redirect('/guest/login');
  });
});

module.exports = router;