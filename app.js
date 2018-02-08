const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// setup middleware modules
app.use(morgan('dev'));                           // log every request to the console
app.use(cookieParser());                          // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                       // parse application/json

// connects to the mongoDB
// currently this is just a dev DB run throuh mlab.com
// we only have to connect to the DB here. Every other file
// that needs to connect to the DB will be enabled through this connection
mongoose.connect('mongodb://admin:pocketlabspw@ds131782.mlab.com:31782/pocket-labs')

// setup sessions for user data
app.use(session({
  secret: 'pocketlabswooooo',
  saveUninitialized: false,                       // don't create session until something stored
  resave: false,                                  // don't save session if unmodified
  rolling: true,                                  // refresh maxAge on cookie, resetting expiration countdown
  store: new MongoStore({
    mongooseConnection: mongoose.connection,      // using same DB connection as app proper
    touchAfter: 24 * 3600                         // (seconds) touches session once/day if requests but not modified
  })
}));

// passport authentication setup
app.use(passport.initialize());
app.use(passport.session());                      // persistent login sessions
app.use(flash());                                 // use connect-flash for flash messages stored in session

app.get("/", function(req, res) {
  res.json({worked: 'woooo'});
})

app.listen(port, function() { console.log("Listening on port: " + port) });
