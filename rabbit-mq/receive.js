var amqp = require('amqplib/callback_api');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/tagalongdb';


amqp.connect('amqp://tagalong', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'positionq';
        ch.assertQueue(q, {durable: false});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function (msg) {
            var recmsg = msg.content.toString();
            console.log(" [x] Received %s", recmsg);
            var splitmsg = recmsg.split("#");
            var latitude = parseFloat(splitmsg[3]);
            var longitude = parseFloat(splitmsg[4]);
            var recvdtime = parseFloat(splitmsg[2]);
            var rectripid = splitmsg[1];
            var id = splitmsg[0];
            console.log("Latitude: %s Longitude: %s", latitude, longitude);
            MongoClient.connect(url, function (err, db) {
                if (err) {
                    console.log('Unable to connect to the mongoDB server. Error:', err);
                } else {
                    console.log('Connection established to', url);
                    var collection = db.collection('userlocation');
                    var alertcol = db.collection('alerts');
                    collection.find({loc: {$near: [longitude, latitude ], $maxDistance: 1000.0784806153}, time: {$gte: recvdtime-120000, $lt: recvdtime}, tripid: rectripid}, {userid: 1}).toArray(function (err, result) {
                        var array = [];                        
                        if (err) {
                            console.log(err);
                        } else{
                            var alert = 0;
                            console.log('Found:', result);
                            collection.find({tripid: rectripid}).toArray(function (err, docs) {
                                docs.forEach(function (doc) {
                                    var flag = 0;
                                    result.forEach(function (item) {
                                        if (doc.userid == item.userid) {
                                            flag = 1;
                                        }
                                    });
                                    if (flag == 0 && doc.userid != id) {
                                        array.forEach(function(ele) {
                                            if(doc.userid == ele)
                                            {
                                                flag =1 ;
                                            }
                                        });
                                        if(flag == 0)
                                        array.push(doc.userid);
                                        //alert = 1;
                                    }
                                });
                                console.log(array);
                                
                                
                                if(array.length >0){
                                conn.createChannel(function (err, sendch) {
                                    var sendq = 'alertq';
                                    var msg = rectripid + '#' + recvdtime + '#' + array ;
                                    sendch.assertQueue(sendq, {durable: false});
                                    sendch.sendToQueue(sendq, new Buffer(msg));
                                    console.log(" [x] Sent %s", msg);
                                });
                            }
                                
                                
                                
                                
                                
                                /*if(alert == 1){
                                 var alertcol = db.collection('alerts');
                                 var alertentry = {tripid:rectripid, time:recvdtime, members: array};
                                 alertcol.insert(alertentry,function(err,result){
                                 if (err) {
                                 console.log(err);
                                 } else {
                                 //console.log('Inserted %d documents into "alerts" collection. The documents inserted with "_id" are:', result.length, result);
                                 }
                                 //Close connection
                                 }); 		
                                 }*/

// curl -H "Content-Type: application/json" -X POST -d '{"phonenumber":"9967809199","latitude":"111.5","longitude":"111.1", "tripid":"21"}' http://localhost:8080/sendCoordinates

                            });
                        } /*else {
                            console.log('No document(s) found with defined "find" criteria!');
                        }*/
                        //console.log(array);
                        db.close();
                    });
                }
            });
        }, {noAck: true});
    });
});
