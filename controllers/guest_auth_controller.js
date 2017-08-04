const db = require("../models");

module.exports = function(app, passport) {

  app.post('/room/book', passport.authenticate('local-signup',
    { 
      successRedirect: '/guest',
      failureRedirect: '/'
    }
  ));

  app.get('/guest', isLoggedIn, function(req, res) {
    db.Guest.findAll({
      where: {
        id: req.user.id
      },
      include: [db.Room]
    }).then(function(result) {
      res.render("guest", {
        guest: result
      });
    });
  });

  app.get('/guest/logout', isLoggedIn, function(req, res) {
    req.session.destroy(function(err) {
      res.redirect('/');
    });
  });

  app.post('/guest/login', passport.authenticate('local-signin',
    {
      successRedirect: '/guest',
      failureRedirect: '/guest/login'
    }
  ));

  app.put("/guest/checkout", isLoggedIn, function(req, res) {
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

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/guest/login');
  }
}