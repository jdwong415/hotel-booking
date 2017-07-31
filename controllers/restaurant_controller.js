const express = require('express');
const router = express.Router();
const db = require("../models");


//get all the res
router.get('/food/index', function(req, res) {
  db.Restaurant.findAll({ 
    order: [
        ["name", "ASC"]
    ],
    include: [{
      model: db.Table, 
      attributes:["party_number"]
    }]
  }).then(function(data) {
    var hbsObject = {reservations: data};
    console.log(hbsObject);
    res.render('/food/index', hbsObject);
  });
});

//adding a res to the list
router.post('/food/create', function(req, res) {
  return db.Table.create({
    party_number: req.body.party_number,
    
   }).then(function(data) {
    res.redirect('/food/index');
  });
});

//delete a res
router.delete("/food/delete/:id", function(req, res) {
    return db.Table.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect('/food/index');
    });
});

module.exports = router;