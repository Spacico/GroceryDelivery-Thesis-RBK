//This file for connecting to the database
var mongoose = require('mongoose');
// var mongoUrl='mongodb://admin:admin@ds113435.mlab.com:13435/books'
// mongoose.connect(mongoUrl);
mongoose.connect('mongodb://localhost/grocery');
//mongodb://<dbuser>:<dbpassword>@ds113435.mlab.com:13435/books

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(' we are connected!');
});
module.exports = db;
