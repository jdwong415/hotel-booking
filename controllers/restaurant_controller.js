const express = require('express');
const router = express.Router();
const db = require("../models");

router.get('/', function(req, res) {
  res.redirect('/index');
});

//get all the res
router.get('/index', function(req, res) {
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
    res.render('index', hbsObject);
  });
});

//adding a res to the list
router.post('/create', function(req, res) {
  return db.Table.create({
    party_number: req.body.party_number,
    
   }).then(function(data) {
    res.redirect('/index');
  });
});

//delete a res
router.delete("/:id", function(req, res) {
    return db.Table.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect("/index");
    });
});

module.exports = router;