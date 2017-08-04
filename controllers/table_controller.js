const express = require('express');
const router = express.Router();
const db = require("../models");

//get all the res
router.get('/tables', function(req, res) {
  db.Table.findAll({ 
  }).then(function(data) {
    var hbsObject = {tables: data};
    res.render('tables', hbsObject);
  });
});

//adding a res to the list
router.post('/tables', function(req, res) {
	db.Table.create({
	name: req.body.name,
	phone: req.body.phone,
	email: req.body.email,
  num_party: req.body.num_party,
  res_time: req.body.res_time,
 }).then(function(data) {
 	  db.Table.update({
      GuestId: data.dataValues.id,
      available: false
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(data) {
      res.redirect('/tables');
    });
  });
});

//delete a res
router.delete("/tables/:id", function(req, res) {
  return db.Table.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.redirect('/tables');
  });
});

module.exports = router;