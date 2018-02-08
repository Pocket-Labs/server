const express = require('express');

module.exports = function(passport) {
  var router = express.Router();

  router.get('/woo', function(req, res) {
    res.json({worked: 'wooo'});
  })

  return router;
}
