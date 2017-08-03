const express = require('express');
const router = express.Router();
const db = require("../models");

router.get('/admin/', function(req, res) {
 res.render("manager");
});

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

//table view for manager
router.get('/admin/tables', function(req, res) {
  db.Table.findAll({}).then(function(result) {
    res.render("tables-admin", {
      tables: result
    });
  });
});

router.post('/admin/tables-admin', function(req, res) {
  db.Table.findAll({
    where: {
      name: req.body.name
    }
  }).then(function(result) {
    res.json(result);
  });
});

router.get('/admin/tables/id/:id', function(req, res) {
  db.Table.findAll({
    where: {
      id: req.params.id
    },
  }).then(function(result) {
    res.render("table", {
      tables: result
    });
  });
});

router.put("/admin/checkin/id/:id", function(req, res) {
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

router.put("/admin/checkout/id/:id", function(req, res) {
  db.Guest.findOne({
    where: {
      room_number: req.params.id
    }
  }).then(function(result) {
    db.Room.update({
      available: true,
      checkin: false,
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(result2) {
      db.Guest.destroy({
        where: {
          id: result.dataValues.id
        }
      }).then(function(result3) {
        res.redirect("/admin/rooms/id/" + result.dataValues.room_number);
      });
    });
  });
});

module.exports = router;