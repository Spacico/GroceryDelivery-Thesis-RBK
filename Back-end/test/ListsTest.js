var chai = require('chai');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var Lists = require('../database/model/Lists.js');
//var Consumers = require('../database/model/Consumers.js');
describe('Lists Model', function () {
  it('should be a Mongoose model', function () {
    expect(new Lists()).to.be.instanceOf(mongoose.Model);
  });
  it('should have a schema', function () {
    expect(Lists.schema).to.exist;
  });
  it('should find results correctly', function (done) {
   	Lists.find(function(err,result){
   		if(result){
   			done();
   		}
   	})
  })
});
