var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var UserSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  email: String,
  password: String
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwtToken = function(authKey) {
    const payload = {
        email: this.email
    };
    var token = jwt.sign(payload, authKey, {
        expiresIn: 24 * 60 * 60 // 24 hours
    });
    return token;
}

module.exports = mongoose.model('User', UserSchema);
