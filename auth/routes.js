const express = require('express');
var User = require('./models.js');

module.exports = function(auth) {
  var router = express.Router();

  router.get('/woo', auth.authenticate(), function(req, res) {
      console.log(req.user)
    res.json({worked: 'wooo'});
  })

  router.post('/register', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

    User.findOne({ email: email }, function(err, user) {
      if (err) throw err;

      if (user) {
        // cannot create register if email already taken
        res.json({ success: false, message: 'Registration failed: email already taken' });
      } else {
        var newUser = new User({
          email: email,
          name: {
            first: firstName,
            last: lastName
          }
        });
        newUser.password = newUser.generateHash(password);

        newUser.save(function(err) {
            if (err) throw err;
            res.json({
                success: true,
                token: newUser.generateJwtToken(auth.authKey)
            });
        });
      }
    });
  });

  router.post('/obtain-auth-token', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({ email: email }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        if (user.validPassword(password)) {
          res.json({
            success: true,
            token: user.generateJwtToken(auth.authKey)
          });
        } else {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
      }
    })
  });

  return router;
}
