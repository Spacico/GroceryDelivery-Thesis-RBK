var chai = require('chai');
var expect = require('chai').expect;
//var expect = require('mocha');
var mongoose = require('mongoose');
var Agents = require('../database/model/Agents.js');
var db = require('../database/index.js');
//var Consumers = require('../database/model/Consumers.js');
describe('Agents Model', function () {

  it('should be a Mongoose model', function () {
    expect(new Agents()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(Agents.schema).to.exist;
  });
  it('should find results correctly', function (done) {
   	
   	// var agent=new Agents({agentName:'ahmad',password:'xyz',nationalId:'0154646464',address:'Amman',phone:'0795800921',birthDate:22-10-1983,firstName:'sam',lastName:'you'})
   	Agents.find(function(err,result){
   		if(result){
   			//console.log(result)
   			done();
   		}
   	})
  })

});


  