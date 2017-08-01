const express = require('express');
const router = express.Router();
const db = require("../models");

router.get('/admin/rooms', function(req, res) {
  db.Room.findAll({}).then(function(result) {
    res.render("rooms", {
      rooms: result,
      helpers: {
        times: function(n, block) {
          var accum = '';
          for(var i = 0; i < n; ++i)
            accum += block.fn(i);
          return accum;
        }
      }
    });
  });
});

router.get('/admin/rooms/:id', function(req, res) {
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
})

module.exports = router;