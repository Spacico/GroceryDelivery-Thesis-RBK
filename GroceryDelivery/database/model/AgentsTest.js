var expect = require('chai').expect;
var mongoose = require('mongoose');
var Agents = require('./Agents.js');

describe('Agents Model', function () {

  it('should be a Mongoose model', function () {
    expect(new Agents()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', function () {
    expect(Agents.schema).to.exist;
  });


});
