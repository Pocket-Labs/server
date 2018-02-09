const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const auth = require('./config/auth.js');
const flash = require('connect-flash');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// middleware ==================================================================
app.use(morgan('dev'));                           // log every request to the console
app.use(cookieParser());                          // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                       // parse application/json
app.use(express.static(__dirname + '/app/build'));
app.use(express.static(__dirname + '/static'));

// mongoDB =====================================================================
// currently this is just a dev DB run throuh mlab.com
// we only have to connect to the DB here. Every other file
// that needs to connect to the DB will be enabled through this connection
var configDB = require('./config/database.js');
mongoose.connect(configDB.url)

// passport setup ==============================================================
app.use(auth.initialize());

// routes ======================================================================
require('./globalRoutes.js')(app, auth)

// launch ======================================================================
app.listen(port, function() { console.log("Listening on port: " + port) });
