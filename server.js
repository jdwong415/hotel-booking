// Dependencies
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Models to sync
var db = require("./models");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Serve files in 'public' directory
app.use(express.static('public'));

// Load routes
app.use(require('./controllers/index_controller'));
app.use(require('./controllers/guest_controller'));
app.use(require('./controllers/api-yelp'));
app.use(require('./controllers/table_controller'));

require('./controllers/guest_auth_controller')(app, passport);
require('./controllers/admin_auth_controller')(app, passport);
require('./config/passport/passport.js')(passport);

app.use('/', function(req, res) {
  res.render('index');
});

// Sync models then start the server to begin listening
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
  	console.log("----------------------");
    console.log("App listening on PORT " + PORT);
  });
});