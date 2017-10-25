var chai = require('chai');
var expect = require('chai').expect;
var mongoose = require('mongoose');
//var Agents = require('../database/model/Agents.js');
var Consumers = require('../database/model/Consumers.js');
describe('Consumers Model', function () {
  it('should be a Mongoose model', function () {
    expect(new Consumers()).to.be.instanceOf(mongoose.Model);
  });
  it('should have a schema', function () {
    expect(Consumers.schema).to.exist;
  });
  it('should find results correctly', function (done) {
   	Consumers.find(function(err,result){
   		if(result){
   			done();
   		}
   	})
  })
});
