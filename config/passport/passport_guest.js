var LocalStrategy = require('passport-local').Strategy;
const db = require("../../models");

module.exports = function(passport) {

  var Guest = db.Guest;

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Guest.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
      }
      else{
        done(user.errors, null);
      }
    });
  });

  passport.use('local-signup', new LocalStrategy ({
    usernameField : 'email',
    passwordField : 'lastname',
    passReqToCallback : true
  }, function(req, email, lastname, done) {
    var data = {
      first_name: req.body.firstname,
      last_name: lastname,
      phone: req.body.phone,
      email: email,
      room_number: req.body.room,
      checkin: req.body.checkin,
      checkout: req.body.checkout
    };

    Guest.create(data).then(function(user, created) {
      if (!user) {
        return done(null, false);
      }
      else if (user) {
        db.Room.update({
          GuestId: user.dataValues.id,
          available: false
        }, {
          where: {
            id: req.body.room
          }
        }).then(function(result) {
          return done(null, user);
        });
      }
    });
  }));
    
  passport.use('local-signin', new LocalStrategy({
      usernameField : 'room',
      passwordField : 'lastname',
      passReqToCallback : true
    }, function(req, room, lastname, done) {
      Guest.findOne({
        where: {
          room_number: room
        }
      }).then(function(result) {
        if (!result) {
          return done(null, false, { message: 'User was not found.' });
        }
        if (result.last_name.toLowerCase() !== lastname.toLowerCase()) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, result);
      }).catch(function(err) {
        console.log("Error:", err);
        return done(null, false, { message: 'Error with sign in' });
      });
    }
  ));
}