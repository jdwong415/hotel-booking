const db = require("../models");

module.exports = function(app, passport) {

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/admin', function(req, res) {
    res.render('adminindex'); // load the index file
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  app.get('/admin/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('loginadmin'); 
  });

  // process the login form
  // app.post('/login', do all our passport stuff here);
  app.post('/admin/login', passport.authenticate('admin-login', {
    successRedirect : '/manager', // redirect to the secure profile section
    failureRedirect : '/admin/login' // redirect back to the signup page if there is an error
  }));

  // =====================================
  // SIGNUP ==============================
  // =====================================
  app.get('/admin/signup', function(req, res) {
    res.render('adminsignup');
  });

  // process the signup form
  // app.post('/signup', do all our passport stuff here);
  app.post('/admin/signup', passport.authenticate('admin-signup', {
    successRedirect : '/manager', // redirect to the secure profile section
    failureRedirect : '/admin/signup' // redirect back to the signup page if there is an error
  }));

  app.get('/manager', isLoggedIn, function(req, res) {
    res.render('manager');
  });

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/admin/rooms', isLoggedIn, function(req, res) {
    db.Room.findAll({}).then(function(result) {
      res.render("rooms", {
        rooms: result
      });
    });
  });

  app.post('/admin/rooms', isLoggedIn, function(req, res) {
    db.Guest.findAll({
      where: {
        last_name: req.body.name
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get('/admin/rooms/id/:id', isLoggedIn, function(req, res) {
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

  app.put("/admin/checkin/id/:id", isLoggedIn, function(req, res) {
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

  app.put("/admin/checkout/id/:id", isLoggedIn, function(req, res) {
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

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
      res.redirect('/');
    });
  });
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/admin/login');
}