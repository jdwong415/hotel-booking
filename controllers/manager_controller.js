const express = require('express');
const router = express.Router();
const db = require("../models");

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

module.exports = router;