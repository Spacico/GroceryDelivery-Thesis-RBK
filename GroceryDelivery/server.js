var express = require('express');
var http=require('http');
var bcrypt = require('bcrypt-nodejs');
var mongoose =require ('mongoose');
var bodyParser = require('body-parser');
var db=require('./database/index');
var Agents=require('./database/model/Agents'); 
var Consumers=require('./database/model/Consumers');
var Lists=require('./database/model/Lists');
var port=process.env.PORT ||1128;
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

list=new Lists({agentName:'ahmad',consumerName:'mohamed',items:'tomato'});
// list.save(function (err, fluffy) {
//   if (err) return console.error(err);
// });
Lists.find({},function (err,result){
  if(err){
    console.log(err)
  }
  else{
    console.log(result)
  }
})
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
