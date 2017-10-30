//This file for connecting to the database
var mongoose = require('mongoose');
var mongoUrl='mongodb://spacecho:hackerspace@ds127065.mlab.com:27065/groucerydelivery';
mongoose.connect(mongoUrl);
// mongoose.connect('mongodb://localhost/grocery');
// mongodb://<dbuser>:<dbpassword>@ds113435.mlab.com:13435/books

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log(' we are connected!');
});
module.exports = db;