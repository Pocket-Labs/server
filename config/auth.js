var passport = require('passport');
var passportJWT = require('passport-jwt');
var User = require('../auth/models.js')

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

const authKey = 'welovecomputerscience'

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = authKey;

var strategy = new JwtStrategy(opts, function(payload, done) {
    User.findOne({email: payload.email}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

passport.use(strategy);

module.exports = {
  initialize: function() {
      return passport.initialize();
  },
  authenticate: function() {
      return passport.authenticate("jwt", {session: false});
  },
  authKey: authKey
}
