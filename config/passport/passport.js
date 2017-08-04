var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
const db = require("../../models");

module.exports = function(passport) {

  var Guest = db.Guest;
  var Admin = db.Manager;

  passport.serializeUser(function(user, done) {
    return done(null, { id: user.id, isAdmin: user.isAdmin });
  });

  passport.deserializeUser(function(id, done) {
    if (!id.isAdmin) {
      Guest.findById(id.id).then(function(user) {
        if (user) {
          done(null, user.get());
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
    else if (id.isAdmin) {
      Admin.findById(id.id).then(function(user) {
        if (user) {
          done(null, user.get());
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  });

  // Guest Signup
  passport.use('local-signup', new LocalStrategy ({
    usernameField : 'email',
    passwordField : 'lastname',
    passReqToCallback : true
  }, 
  function(req, email, lastname, done) {
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
    
  // Guest signin
  passport.use('local-signin', new LocalStrategy({
    usernameField : 'room',
    passwordField : 'lastname',
    passReqToCallback : true
  },
  function(req, room, lastname, done) {
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
  }));

  // Manager signup
  passport.use('admin-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
    Admin.findOne({
      where: {
        email: email
      }
    }).then(function(result) {
      if (result) {
        return done(null, false, {
          message: 'Email already exists.'
        });
      }
      else {
        var managerPassword = generateHash(password);
        var data = {
          email: email,
          password: managerPassword,
          first_name: req.body.firstname,
          last_name: req.body.lastname
        };
        Admin.create(data).then(function(newManager, created) {
          if (!newManager) {
            return done(null, false);
          }
          else if (newManager) {
            return done(null, newManager);
          }
        });
      }
    });
  }));

  // Manager signin
  passport.use('admin-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    var isValidPassword = function(userpass, password) {
      return bCrypt.compareSync(password, userpass);
    }
    Admin.findOne({
      where: {
        email: email
      }
    }).then(function(result) {
      if (!result) {
        return done(null, false, {
          message: 'Email does not exist.'
        });
      }
      if (!isValidPassword(result.password, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, result);
    }).catch(function(err) {
      console.log("Error:", err);
      return done(null, false, {
        message: 'Something went wrong with your Sign-in'
      });
    });
  }));
}