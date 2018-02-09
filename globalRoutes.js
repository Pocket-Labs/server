module.exports = function(app, auth) {
  app.use('/', require('./auth/routes.js')(auth));
}
