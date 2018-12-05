var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClaimSchema  = new Schema({
	claimName: String,
	claimDescription: String,
});

module.exports = mongoose.model('Claim', ClaimSchema);
