'use strict';

const express = require('express');

var bodyParser = require('body-parser');
var amqp = require('amqplib/callback_api');
var mongodb = require('mongodb');
// Constants
const PORT = 8080;

// App
const app = express();

//mongodb//
//lets require/import the mongodb native drivers.


//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/tagalongdb';


app.use(express.static('node_modules'))
app.use(express.static('web'))
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {

     var collection = db.collection('userlocation');
     collection.createIndex({"loc":"2d"});
     console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
     console.log('Connection estafgsdthrdtthyblished to');
  }
});


app.get('/', function (req, res) {
  res.send('WelCome to TagAlong App\n');
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/auth', (req, res) => {
  console.log(req.body.username);
  console.log(req.body.password);

  res.send("ok");
});


app.get('/userlist', function(req, res) {

    MongoClient.connect(url, function (err, db) {
 	 if (err) {
 	   console.log('Unable to connect to the mongoDB server. Error:', err);
 	 }
 	 var collection = db.collection('users');
     collection.find().toArray(function(err, docs){
         console.log("retrieved records:");
         res.send(docs);
     });
    });
});

app.get('/alert', function (req, res) {
    var tripid = req.body.tripid;

    MongoClient.connect(url, function (err, db) {
 	 if (err) {
 	   console.log('Unable to connect to the mongoDB server. Error:', err);
 	 }
 	 var collection = db.collection('alerts');
     collection.find({'tripid':tripid}).toArray(function(err, docs){
         console.log("retrieved records:");
         res.send(docs);
     });
    });
});
app.get('/alerts', function (req, res) {

    MongoClient.connect(url, function (err, db) {
 	 if (err) {
 	   console.log('Unable to connect to the mongoDB server. Error:', err);
 	 }
 	 var collection = db.collection('alerts');
     collection.find().toArray(function(err, docs){
     var array = [];
                                             docs.forEach(function (item) {
                                                var tt = date(item.time);
                                             var ss = {'_id':item._id,'time': tt,'members':item.members,'tripid':item.tripid}

                                             array.push(ss)

                                             });

         res.send(array);
     });
    });
});

function date(mili){
return new Date(mili).toISOString().replace(/T/, ' ').replace(/\..+/, '');
};



app.post('/register', (req, res) => {
    var username = req.body.username;
    var phonenumber = req.body.phonenumber;
    var password = req.body.password;
	MongoClient.connect(url, function (err, db) {
 	 if (err) {
 	   console.log('Unable to connect to the mongoDB server. Error:', err);
 	 } else {
	  var collection = db.collection('users');
	   var result=  collection.find({'number':phonenumber}).toArray();
              if (result.length >= 1)
              {
                  console.log('user  %s already registered ', username);
              } else {
              	  var user = { name: username, number: phonenumber};
              	  collection.insert(user, function (err, result) {
                        if (err) {
                           console.log(err);
                        } else {
                        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                           }
                       //Close connection
                       db.close();
                      });

               	 }
               	 }
               	 });

            MongoClient.connect(url, function (err, db) {
         	 if (err) {
         	   console.log('Unable to connect to the mongoDB server. Error:', err);
         	 }
         	 var collection = db.collection('users');
             collection.find({'name':username}).toArray(function(err, docs){
                 console.log("retrieved records:");
                 res.send(docs);
             });
            });
});






app.post('/sendCoordinates', (req, res) => {
var latitude = parseFloat(req.body.latitude);
var id = parseFloat(req.body.phonenumber);
var longitude = parseFloat(req.body.longitude);
var tripID = req.body.tripid;
var time = Date.now();
    console.log("starting 1 ");
    MongoClient.connect(url, function (err, db) {
    if (err) {
    console.log("starting 2 ");
    console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
    console.log("starting 3 ");
    var collection = db.collection('userlocation');
            var user = { userid: id, tripid: tripID, time:time, loc:[latitude, longitude] };
            collection.insert(user, function (err, result) {
            if (err) {
            console.log(err);
            } else {
            console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
            }
            //Close connection
            db.close();
            });
    }
    });
    amqp.connect('amqp://tagalong', function(err, conn) {
    conn.createChannel(function(err, ch) {
    console.log("starting 4 ");
    var q = 'positionq';
            var msg = id + '#' + tripID + '#' + time + '#' + latitude + '#' + longitude;
            ch.assertQueue(q, {durable: false});
            // Note: on Node 6 Buffer.from(msg) should be used
            ch.sendToQueue(q, new Buffer(msg));
            console.log(" [x] Sent %s", msg);
    });
         //   setTimeout(function() { conn.close() }, 500);
            });
            console.log("starting 5 ");
    res.send("Recieved coordinates");
    });


app.post('/starttrip', (req, res) => {

   var tripname = req.body.tripname;

    var numberarray = req.body.members;

    MongoClient.connect(url, function (err, db) {
     	 if (err) {
     	   console.log('Unable to connect to the mongoDB server. Error:', err);
     	 } else {
            var collection = db.collection('trips');
            var trip = { 'tripname': tripname, 'members': numberarray};
            collection.insert(trip, function (err, result) {
                            if (err) {
                               console.log(err);
                            } else{
                            console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                               }
                           //Close connection
                           db.close();
                           res.send(result.ops[0]._id);

                          });
                          }
                          });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
