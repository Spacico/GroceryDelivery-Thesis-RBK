//This model to store Consumer information
var mongoose = require('mongoose');
var consumerSchema = mongoose.Schema({
  address:  String ,
  consumerName: {type: String, index: {unique: true} },
  passowrd: String,
  phone:String
});
var Consumers = mongoose.model('Consumers', consumerSchema);
consumerSchema.pre('save', function(next) { 
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
  .then(function(hash) {
    this.password = hash;
    next();
  });
});
module.exports = Consumers;

