module.exports = function(app, passport) {
  app.use('/', require('./auth/routes.js')(passport));
}
