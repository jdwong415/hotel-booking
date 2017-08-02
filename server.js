// Dependencies
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var passport = require('passport');

var GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
    clientID: "0f7096bc3033d6f80afe",
    clientSecret: "6b7b2f01f5f54990bb16402601a91f2ca6e3fd96",
    callbackURL: "http://localhost:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));


// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Models to sync
var db = require("./models");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Serve files in 'public' directory
app.use(express.static('public'));

// Load routes
app.use(require('./controllers/index_controller'));
app.use(require('./controllers/guest_controller'));
app.use(require('./controllers/manager_controller'));
app.use(require('./controllers/table_controller'));

app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

// Express and Passport Session
var session = require('express-session');
app.use(session({secret: "secret"}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  // maybe you are going to get the user from mongo by id?
  // null is for errors
  done(null, user);
});

// we will call this to start the GitHub Login process
app.get('/auth/github', passport.authenticate('github'));

// GitHub will call this URL
var html; 

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
  	// dump the user for debugging
	if (req.isAuthenticated()) {
  	html += "<p>authenticated as user:</p>";
  	html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
	}
	console.log(html);
    res.redirect('/');
  }
);

// Simple middleware to ensure user is authenticated.
// Use this middleware on any resource that needs to be protected.
// If the request is authenticated (typically via a persistent login session),
// the request will proceed.  Otherwise, the user will be redirected to the
// login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }

  // denied. redirect to login
  res.redirect('/')
}

app.get('/protected', ensureAuthenticated, function(req, res) {
  res.send("access granted. secure stuff happens here");
});




// Sync models then start the server to begin listening
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});