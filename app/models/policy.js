var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PolicySchema  = new Schema({
	policy1: String,
	policy2: String,
	policy3: String
});

module.exports = mongoose.model('Policy', PolicySchema);
