//This model to store Consumer information
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var consumerSchema = mongoose.Schema({
  address:  String,
  consumerName: {type: String, index: {unique: true} },
  password: String,
  phone:String
});

var Consumers = mongoose.model('Consumers', consumerSchema);

module.exports = Consumers;
