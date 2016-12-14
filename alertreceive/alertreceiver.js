var amqp = require('amqplib/callback_api');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/tagalongdb';

amqp.connect('amqp://tagalong', function (err, conn) {
conn.createChannel(function (err, ch) {
    var q = 'alertq';
    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function (msg) {
        var recmsg = msg.content.toString();
        console.log(" [x] Received %s", recmsg);
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } 
            else {
                console.log('Connection established to', url);
                var alertcol = db.collection('alerts');
                var splitmsg = recmsg.split("#");
                var tripid = splitmsg[0];
                var time = parseFloat(splitmsg[1]);
                var members = splitmsg[2];
                var alertentry = {tripid:tripid, time:time, members: members};
                alertcol.insert(alertentry, function (err, result) {
                if (err) {
                console.log(err);
                } else {
                console.log('Inserted %d documents into "alerts" collection. The documents inserted with "_id" are:', result.length, result);
                }
                //Close connection
                db.close();
                });
            }
        });
    });
});   
});