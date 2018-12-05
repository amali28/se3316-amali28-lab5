var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PolicySchema  = new Schema({
	text: String,
});

module.exports = mongoose.model('Policy', PolicySchema);
