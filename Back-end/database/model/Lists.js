//This Model stores the coments (reviews )data
var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
	agentName:  String,
	consumerName: String,
	items:String,
	available: Boolean,
	location :{
		latitude:Number,
		longitude:Number
	},
	storeInfo:String
})

var Lists = mongoose.model('Lists', listSchema);

module.exports = Lists;
