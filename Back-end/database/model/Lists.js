//This Model stores the coments (reviews )data
var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
<<<<<<< HEAD:Back-end/database/model/Lists.js
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
=======
    agentName: String,
    consumerName: String,
    items: String,
    available: Boolean,
    location: {
        latitude: Number,
        longitude: Number
    },
    storeInfo: String
});
>>>>>>> a12e2d41bdfd2b77e6a99319b3bda0992ebd8677:database/model/Lists.js

var Lists = mongoose.model('Lists', listSchema);

module.exports = Lists;
