var express = require('express');
var http=require('http');
// var bcrypt = require('bcrypt-nodejs');
var mongoose =require ('mongoose');
var bodyParser = require('body-parser');
// var db=require('./database/index');
var Agents=require('./database/model/Agents');
var Consumers=require('./database/model/Consumers');
var Lists=require('./database/model/Lists');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port=process.env.PORT || 1128;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get ('/', (req, res) => {
  console.log('Thank you for using our server test');
  res.send('Thank you for using our server test');
})

// login router
app.post ('/login', (req, res) => {
  console.log(req.body);
  res.end();
})

// ######### Consumer Routings #############

// Get from the client Notification and create new list
app.post ('/sendNotification', (req, res) => {
	console.log(req.body);
  Lists.create({items: req.body.items, consumerName: req.body.consumerName, available: true}, (err, list) => {
    if (err) console.log(err);

    res.status(200).send ('Notification has been sent, wait for response');
  })
})

// ######### Agent Routings #############

// Send to the agent Notification of available `lists`
app.get ('/getNotification', (req, res) => {
  console.log('get From Ahmad');
  res.send();
})

app.get ('/checkAvailableLists', (req, res) => {
  Lists.find({available: true}, (err, lists) => {
    if (err) console.log(err);

    res.send(lists);
  })
})

// Agent "accepts" the list
app.post ('/acceptsList', async (req, res) => {
  var updatedList = await Lists.findOneAndUpdate({_id: req.body.listId}, {agentName: req.body.agentName}, {new: true});
    console.log(updatedList, '--------------');
    console.log('This list from ' + updatedList.consumerName + ' will be served by ' + updatedList.agentName);
    res.send ('This list from ' + updatedList.consumerName + ' will be served by ' + updatedList.agentName);
})


// app.listen(port, function() {
//   console.log(`listening on port ${port}`);
// });
   io.on('connection', function(socket){
      console.log("loleleeeeeeeeeeeeesh")
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
   
http.listen(port, function() {


console.log("    *   '*");
console.log("              *");
console.log("                   *");
console.log("                           *");
console.log("                  *");
console.log("                         *");
console.log(`you are now connected to:  ${port}`);
});

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });
// io.on('connection', function(socket){
//   socket.broadcast.emit('hi');
// });

