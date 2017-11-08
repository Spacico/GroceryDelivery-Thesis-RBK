// import Sockets from 'react-native-sockets';
//     import { DeviceEventEmitter } from 'react-native';

// var io = require('socket.io')(server);
var express = require('express');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = require('./database/index');
var Agents = require('./database/model/Agents');
var Consumers = require('./database/model/Consumers');
var Lists = require('./database/model/Lists');

var port = process.env.PORT || 1128;

var app = express();
var server = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var http = require('http');
var socketio = require('socket.io');
var server = http.Server(app);
var io = socketio(server);


//use sessions for tracking logins
app.use(
    session({
        secret: 'spacecho',
        resave: true,
        saveUninitialized: false
    })
);

var flag = false;

// Middel ware functions
var mid = {
    requiresLogin: (req, res, next) => {
        console.log(req.session.username);
        if (req.session.username) {
            return next();
        } else {
            var err = 'You must be logged in to view this page.';
            return next(err);
        }
    }
};

app.get('/', mid.requiresLogin, (req, res) => {
    console.log(req.session);
    console.log('Thank you for using our server test');
    res.send({message:'Thank you for using our server test'});
});

// login router
app.post('/consumerLogin', (req, res) => {
    console.log('--------> consumerLogin', req.body);
    var consumer = {
        username: req.body.consumerName,
        password: req.body.password
    };
    Consumers.findOne({ consumerName: consumer.username }, (err, user) => {
        if (err) {
            console.log(err);
        } else if (!user) {
            var err = false;
            console.log('error', err);
            res.send({message:'wrong username'});
        } else if (user) {
            bcrypt.compare(consumer.password, user.password, (err, result) => {
                if (result === true) {
                    req.session.username = user.consumerName;
                    console.log(user);
                    res.send(true);
                } else {
                    res.send({message:'Wrong password'});
                }
            });
        }
    });
});

// login router
app.post('/agentLogin', (req, res) => {
    console.log('--------> agentLogin', req.body);
    var agent = {
        username: req.body.agentName,
        password: req.body.password
    };
    Agents.findOne({ agentName: agent.username }, (err, user) => {
        if (err) {
            res.send ({message: 'Something wrong happend'});
        } else if (!user) {
            var err = {};
            err.message = 'User not found.';
            console.log('error', err);
            res.send(err);
        } else if (user) {
            bcrypt.compare(agent.password, user.password, (err, result) => {
                if (result === true) {
                    req.session.username = user.agentName;
                    console.log(user);
                    res.send(true);
                } else {
                  var err = {};
                  err.message = 'Wrong password.'
                    res.send(err);
                }
            });
        }
    });
 });
//Get consumer current list
app.get('/consumer/current/list',async (req,res)=>{
    console.log('------------->>>>','Ahmmmmmmmad', req.session.username)
    try{
       var Consumer = await Consumers.findOne({consumerName: req.session.username});
       var List = await Lists.findOne({ _id: Consumer.currentList });
       console.log(List)
       res.send (List); // What if the list does not exist ??
    }catch (err) {
        console.log ('Faild to find list')
        res.send({message: false}); // Check if it is working.
    }
});

//Get Agent current list
app.get('/agent/current/list',async (req,res)=>{
    console.log('agent current list')
    try{
        var Agent = await Agents.findOne({agentName:req.session.username});
        var List = await Lists.findOne({_id:Agent.currentList});
        res.send(List);
    }catch(err){
        res.send(false);
    }
});

//consumer make list done
app.post('/consumer/current/list/done',async (req,res)=>{
    console.log('inside done',req.body.listId)
   
    try{
        console.log ('TRY ___)++_)')
        var List = await Lists.findOne({_id: req.body.listId});
        console.log('--------->list',List)
        var consumer = await Consumers.findOneAndUpdate({consumerName:req.session.username},{ $push:{history:req.body.listId},currentList:''});
        console.log('--------->consumer',consumer)
        var agent = await Agents.findOneAndUpdate({agentName: List.agentName},{ $push:{history:req.body.listId},currentList:''});
        console.log('--------->agent',agent)
        res.send(true)
    }catch(err){
        res.send({message:'there is not current list right now.'})
    }
})
app.get('/consumer/history/lists', async (req,res)=>{
    var result = [];
    try{
        var Consumer = await Consumers.findOne({consumerName:req.session.username});

        for (var i = 0; i < Consumer.history.length; i++){
            var List = await Lists.findOne( {_id: Consumer.history[i] })
            result.push (List);
        }

        res.send (result);
    } catch (err) {
        res.send ({message: 'Opps something wrong happend'})
    }

})
app.get('/agent/history/lists', async (req,res)=>{
    var result = [];
    try{
        var Agent = await Agents.findOne({agentName:req.session.username});

        for (var i = 0; i < Agent.history.length; i++){
            var List = await Lists.findOne( {_id: Agent.history[i] })
            result.push (List);
        }

        res.send (result);
    } catch (err) {
        res.send ({message: 'Opps something wrong happend'})
    }

})

// GET /logout
app.get('/logout', function(req, res, next) {
    if (req.session.userId) {
        // delete session object
        req.session.userId = null;
    }
    res.send(true);
});
// ######### Consumer Routings #############

// Get from the client Notification and create new list
app.post('/sendNotification', mid.requiresLogin, async(req, res) => {
    console.log ('------->>>> ', req.session.username)
    try{
    var List = await Lists.create({
            items: req.body.items,
            storeInfo: req.body.storeInfo,
            location: {latitude:req.body.latitude, longitude:req.body.longitude},
            consumerName: req.session.username,
            budget:req.body.budget,
            available: true
    });
    var updatedConsumers = await Consumers.findOneAndUpdate(
            { consumerName: req.session.username},
            {currentList: List._id }
        );
    console.log('------------>. ',List)
res.send({message:'Notification has been sent, wait for response'});

}catch(err){
    res.send(err)    
}
})

    // console.log(req.body);
    // Lists.create(
    //     {
    //         items: req.body.items,
    //         storeInfo: req.body.storeInfo,
    //         location: req.body.location,
    //         consumerName: req.body.consumerName,
    //         available: true
    //     },
    //     (err, list) => {
    //         if (err) {console.log(err);
    //         }

    //         res.send({message:'Notification has been sent, wait for response'});
    //     }
    // );
// });

app.post('/consumerSignup', (req, res) => {
    console.log('------> consumerSignup');
    var inuser = {
        username: req.body.userName,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address
    };
    console.log(inuser);
    Consumers.findOne({ consumerName: inuser.username }, (err, user) => {
        if (!user) {
            // console.log('-------------err');
            // res.send(false);
            bcrypt.hash(req.body.password, null, null, function(err, hash) {
                if (err) console.log(err);
                var user = {
                    username: req.body.userName,
                    password: hash,
                    phone: req.body.phone,
                    address: req.body.address
                };
                Consumers.create(
                    { consumerName: user.username, password: user.password },
                    (err, consumer) => {
                        if (err) {
                            res.send({message:err});
                        }
                        res.send(true)
                    }
                );
            });
        } else {
            res.send({message: 'Username is already exist.'});
        }
    });
});

// ######### Agent Routings #############
app.post('/agentSignup', (req, res) => {
    console.log('------> agentSignup');
    bcrypt.hash(req.body.password, null, null, function(err, hash) {
        if (err) console.log(err);
        var user = {
            username: req.body.agentName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            phone: req.body.phone,
            address: req.body.address,
            birthDate: req.body.birthDate
        };
        console.log('------->>>> bcrypt', user);
        Agents.create(
            {
                agentName: user.username,
                password: user.password,
                phone: user.phone,
                address: user.address,
                firstName: user.firstName,
                lastName: user.lastName,
                birthDate: user.birthDate
            },
            (err, agent) => {
                if (!err){ 
                res.send({message:'New agent has been created.'});
                }
                res.send(err);
                
            }
            
        );
    });
});

// Send to the agent Notification of available `lists`
app.get('/checkAvailableLists',mid.requiresLogin,  (req, res) => {
    console.log('checkAvailableLists <---------');
    Lists.find({ available: true }, (err, lists) => {
        if (err) console.log(err);
        console.log('checkAvailableLists', lists);
        res.send(lists);
    });
});

// Agent "accepts" the list
app.post('/acceptsList', mid.requiresLogin, async (req, res) => {
    // This function has been edited by osama,,, give the changes to Ahmad
    console.log('+++++++> acceptsList');

    try {
        var Agent = await Agents.findOne({agentName:req.session.username});
        if(Agent.currentList === '' || Agent.currentList === undefined) {
            var updatedList = await Lists.findOneAndUpdate(
                { _id: req.body.listId, available: true },
                { agentName: req.session.username, available: false },

                { new: true }
            );
            var updatedAgents = await Agents.findOneAndUpdate(
                { agentName: req.session.username },
                { currentList: req.body.listId},
                { new: true }
            );
            console.log(updatedAgents, '--------------',updatedList);
            console.log(
                'This list from ' +
                    updatedList.consumerName +
                    ' will be served by ' +
                    updatedList.agentName
            );
            res.send(
                {message:'This list from ' + 
                    updatedList.consumerName +
                    ' will be served by ' +
                    updatedList.agentName
                  }
            );
        }else{
            res.send({message: false})
        }
    } catch (err) {
        console.log(err);
        console.log('Target list is being serverd right now.');
        res.send({message:'Target list is being serverd right now.'});
    }
});

//io connection 
 io.on('connection', (socket) => {
    //process.setMaxListeners(0);
   console.log('inside conection');
   socket.on('sendList', (message) => {
        console.log('inside sendNotification')
        xyz='leeeleeeleesh'
        io.emit('sendlist', xyz);
    });
    socket.on('acceptList',(message)=>{
        console.log('inside accept list');
        xyz='leeeleeeleesh';
        io.emit('acceptlist',xyz);
    })
  });

server.listen(port);
