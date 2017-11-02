//this Model deal with users data
var mongoose = require('mongoose');

var AgentsSchema = mongoose.Schema({
  agentName: {type: String, index: {unique: true} },
  password: String,
  nationalId: String,
  address:String,
  phone:String,
  birthDate:Date,
  firstName:String,
  lastName:String

});

var Agents = mongoose.model('Agents', AgentsSchema);

module.exports = Agents;
