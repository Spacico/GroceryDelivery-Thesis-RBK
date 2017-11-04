var express = require('express');
var session = require ('express-session');
var bcrypt = require('bcrypt-nodejs');
var mongoose =require ('mongoose');
var bodyParser = require('body-parser');
var db=require('./database/index');
var Agents=require('./database/model/Agents');
var Consumers=require('./database/model/Consumers');
var Lists=require('./database/model/Lists');

var port=process.env.PORT || 1128;

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//use sessions for tracking logins
app.use(session({
  secret: 'spacecho',
  resave: true,
  saveUninitialized: false
}));

// Create SOCKET IO connection
io.on ('connection', (socket) => {
  console.log ('inside connection <---')
  socket.on ('texto', (data) => {
    console.log (data, '<----------')
  })
})

// Middel ware functions
var mid = {
  requiresLogin: (req, res, next) => {
    console.log(req.session.userId);
    if (req.session.userId) {
      return next();
    } else {
      var err = ('You must be logged in to view this page.');
      return next(err);
    }
  }
}

app.get ('/', mid.requiresLogin, (req, res) => {
  console.log(req.session);
  console.log('Thank you for using our server test');
  res.send('Thank you for using our server test');
})


// login router
app.post ('/consumerLogin', (req, res) => {
  console.log('--------> consumerLogin', req.body);
  var consumer = {
    username: req.body.consumerName,
    password: req.body.password
  }
  Consumers.findOne({ consumerName: consumer.username }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (!user) {
      var err = 'User not found.';
      console.log('error', err);
      res.status(401).send(err)
    }else if(user){
    bcrypt.compare(consumer.password, user.password, (err, result) => {
      if (result === true) {
        req.session.userId = user._id;
        console.log(user);
        res.send (user)
      } else {
        res.send(err);
      }
    })
    }
  })
})
// login router
app.post ('/agentLogin', (req, res) => {
  console.log('--------> agentLogin', req.body);
  var agent = {
    username: req.body.agentName,
    password: req.body.password
  }
  Agents.findOne({ agentName: agent.username }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (!user) {
      var err = 'User not found.';
      console.log('error', err);
      res.send(err)
    }else if(user){
    bcrypt.compare(agent.password, user.password, (err, result) => {
      if (result === true) {
        req.session.userId = user._id;
        console.log(user);
        res.send ('login')
      } else {
        res.send('Wrong password.');
      }
    })
  }
})
})

// GET /logout
app.get('/logout', function(req, res, next) {
  if (req.session.userId) {
    // delete session object
    req.session.userId = null;
  }
  res.status(201).send('logout');
});
// ######### Consumer Routings #############

// Get from the client Notification and create new list
app.post ('/sendNotification', mid.requiresLogin, (req, res) => {
	console.log(req.body);
  Lists.create({items: req.body.items,
    storeInfo:req.body.storeInfo,
    location:req.body.location,
     consumerName: req.body.consumerName,
     available: true},
      (err, list) => {
    if (err) console.log(err);

    res.send ('Notification has been sent, wait for response');
  })
})

app.post ('/consumerSignup', (req, res) => {
  console.log('------> consumerSignup');
  bcrypt.hash(req.body.password, null, null, function(err, hash){
    if (err) console.log(err);
    var user = {
      username: req.body.consumerName,
      password: hash,
      phone: req.body.phone,
      address: req.body.address
    }
    Consumers.create ({consumerName: user.username, password: user.password, phone: user.phone, address: user.address}, (err, consumer) => {
      if (err) res.status(401).send(err);
      res.send('New Consumer has been created.');
    })
  });
});

// ######### Agent Routings #############
app.post ('/agentSignup', (req, res) => {
  console.log('------> agentSignup');
  bcrypt.hash(req.body.password, null, null, function(err, hash){
    if (err) console.log(err);
    var user = {
      username: req.body.agentName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hash,
      phone: req.body.phone,
      address: req.body.address,
      birthDate: req.body.birthDate
    }
    console.log('------->>>> bcrypt', user);
    Agents.create ({
       agentName: user.username,
       password: user.password,
       phone: user.phone,
       address: user.address,
       firstName: user.firstName,
       lastName: user.lastName,
       birthDate: user.birthDate
     },
       (err, agent) => {
      if (err) res.status(401).send(err);
      res.send('New agent has been created.');
    })
  });
});

// Send to the agent Notification of available `lists`
app.get ('/checkAvailableLists', (req, res) => {
  console.log('checkAvailableLists <---------');
  Lists.find({available: true}, (err, lists) => {
    if (err) console.log(err);
    console.log('checkAvailableLists', lists);
    res.send(lists);
  })
})

// Agent "accepts" the list
app.post ('/acceptsList', async (req, res) => {
  try {
    var updatedList = await Lists.findOneAndUpdate({_id: req.body.listId, available: true}, {agentName: req.body.agentName, available: false}, {new: true});
      console.log(updatedList, '--------------');
      console.log('This list from ' + updatedList.consumerName + ' will be served by ' + updatedList.agentName);
      res.send ('This list from ' + updatedList.consumerName + ' will be served by ' + updatedList.agentName);
  }catch (err) {
    console.log (err);
    res.send ('Target list is being serverd right now.');
  }
})

// // Agent signup
// app.post ('/agentSignup', (req, res) => {
//   bcrypt.hash(req.body.password, null, null, function(err, hash){
//     if (err) console.log(err);
//     var user = {
//       username: req.body.consumerName,
//       password: hash,
//       phone: req.body.phone,
//       address: req.body.address
//     }
//     Consumers.create ({consumerName: user.username, password: user.password, phone: user.phone, address: user.address}, (err, consumer) => {
//       if (err) res.status(401).send(err);
//       res.status(200).send('New Consumer has been created.');
//     })
//   });
// });


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

// exports.app = app;
