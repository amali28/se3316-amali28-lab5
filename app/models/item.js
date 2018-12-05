var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ItemSchema   = new Schema({
	name: String,
	price: Number,
	quantity: Number,
	tax: Number,
	id: Number,
	numberOfSales: Number,
	descript: String, 
	ratings: Array,
	comments: Array,
});

module.exports = mongoose.model('Item', ItemSchema);
