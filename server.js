// Dependencies
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Models to sync
var db = require("./server/models");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Serve files in 'public' directory
app.use(express.static('public'));

// Load routes
app.use(require('./server/controllers/index_controller'));
app.use(require('./server/controllers/guest_controller'));
app.use(require('./server/controllers/manager_controller'));
app.use(require('./server/controllers/restaurant_controller'));
app.use(require('./server/controllers/room_controller'));
app.use(require('./server/controllers/table_controller'));

// Sync models then start the server to begin listening
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
  	console.log("----------------------");
    console.log("App listening on PORT " + PORT);
  });
});