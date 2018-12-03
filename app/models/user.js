var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema  = new Schema({
	email: String,
	password: String,
	verificationCode: String,
	isLoggedIn: Boolean,
	isVerified: Boolean
});

module.exports = mongoose.model('User', UserSchema);
