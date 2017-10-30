var chai = require('chai');
var expect = require('chai').expect;
var mongoose = require('mongoose');
//var Lists = require('../database/index.js');
describe('Database Connection Tests', function() {
   it('it should connect to the database ', function () {
    before(function (done) {
    mongoose.connect('mongodb://localhost/grocery');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
   });
  });
});