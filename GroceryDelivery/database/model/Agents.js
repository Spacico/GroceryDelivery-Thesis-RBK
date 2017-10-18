//this Model deal with users data
// var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
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
//this for encrypt password data
// AgentsSchema.pre('save', function(next) {
//   var cipher = Promise.promisify(bcrypt.hash);
//   return cipher(this.password, null, null).bind(this)
//   .then(function(hash) {
//     this.password = hash;
//     next();
//   });
// });
module.exports = Agents;
