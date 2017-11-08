//

var express = require('express');
var mongoose = require('mongoose')
var expect = require('chai').expect;
var server = require('../server');
var request = require('request');
var app = require('../server');
var db = require('../database/index');
var Agents = require('../database/model/Agents');
var Consumers = require('../database/model/Consumers');
var Lists = require('../database/model/Lists');

describe('/consumerLogin', function() {
    it('accept exist user', function(done) {
        var consumer = {
            username: 'ahmad',
            password: 'password'
        };
        Consumers.findOne({ consumerName: consumer.username },function (err, user){
            if (user) {
                done();
            }
        });
    });
    it('no user name send error', function()  {
        var consumer = {
            username: 'ahmad',
            password: 'password'
        };
        Consumers.findOne({ consumerName: 'ahmad' },function(err,user){
            if(!user) {done(err)}
        })
        
        
    });
});
describe('consumer Sign up', function()  {
    it('if the name is exists send error', function() {
        var inuser = {
            username: 'ahmad',
            password: 'password'
        };
        Consumers.findOne({ consumerName: inuser.username }, function(err, user) {
            if (user) {
                done(err);
            }
        });
    });
 
});

describe('Agent log in',function(){
    it('it should return error if the user is not exist',function(){
        var agent = {
            username: 'agentName',
            password: 'password'
        };
        Agents.findOne({ agentName: agent.username }, (err, user) => {
            if (err) {
                done(err)
            }done()
    })
})

})

describe('send notification',function(){
    it('should create alist ',function(){
        expect(new Lists()).to.be.instanceOf(mongoose.Model); 
          });
     it('should response message "Notification has been sent, wait for response"',function(){

     })     

    })
    describe('check Available Lists',function(){
        it('should return available lists',function(){
            request('http://localhost:1128/checkAvailableLists', function(error, res, body) {
                if (res.statusCode) {
                  expect(res.statusCode).to.equal(302);
                  done();
                }
              })
    })
    it('list shoud be array',function(){
        Lists.find({ available: true },function(err,lists) {
           expect(list).to.be.instanceOf(Array)
    })
    })
})
describe('server listning' , function() {
    
    it('listens correctly', function() {
      request('http://localhost:1128', function(error, res, body) {
        expect(body).to.exist;
        done();
      });
    });
  })