var request = require('request');
var hostid = '104.198.39.182:8080';
var sleep = require('sleep');

function httprequest1(tripid){
    
    var options = {
            url: 'http://' + hostid + '/sendCoordinates',
            method: 'POST',
            headers: headers,
            form: {'phonenumber':9828615091, 'tripid': tripid , 'latitude':12.8997, 'longitude':77.5951}
        }
          request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log(body);
            }
        })
        
        
     var options = {
            url: 'http://' + hostid + '/sendCoordinates',
            method: 'POST',
            headers: headers,
            form: {'phonenumber':8723897689, 'tripid': tripid, 'latitude':12.8997, 'longitude':77.5951}
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log(body);
            }
        })

        var options = {
            url: 'http://' + hostid + '/sendCoordinates',
            method: 'POST',
            headers: headers,
            form: {'phonenumber':9611105860, 'tripid': tripid, 'latitude':12.8997, 'longitude':77.5951}
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log(body);
            }
        })   
           
}


function httprequest2(tripid){
    
    var options = {
            url: 'http://' + hostid + '/sendCoordinates',
            method: 'POST',
            headers: headers,
            form: {'phonenumber':9828615091, 'tripid': tripid , 'latitude':12.9146, 'longitude':77.5998}
        }
          request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log(body);
            }
        })
        
        
     var options = {
            url: 'http://' + hostid + '/sendCoordinates',
            method: 'POST',
            headers: headers,
            form: {'phonenumber':8723897689, 'tripid': tripid, 'latitude':19.9146, 'longitude':77.6}
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log(body);
            }
        })

        var options = {
            url: 'http://' + hostid + '/sendCoordinates',
            method: 'POST',
            headers: headers,
            form: {'phonenumber':9611105860, 'tripid': tripid, 'latitude':12.9146, 'longitude':77.5998}
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log(body);
            }
        })   
           
}


function httprequest3(tripid){
    
    /*var options = {
            url: 'http://' + hostid + '/sendCoordinates',
            method: 'POST',
            headers: headers,
            form: {'phonenumber':9828615091, 'tripid': tripid , 'latitude':12.9146, 'longitude':77.5998}
        }
          request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log(body);
            }
        })*/
        
        
     var options = {
            url: 'http://' + hostid + '/sendCoordinates',
            method: 'POST',
            headers: headers,
            form: {'phonenumber':8723897689, 'tripid': tripid, 'latitude':15.9146, 'longitude':78.5998}
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log(body);
            }
        })

        var options = {
            url: 'http://' + hostid + '/sendCoordinates',
            method: 'POST',
            headers: headers,
            form: {'phonenumber':9611105860, 'tripid': tripid, 'latitude':15.915, 'longitude':78.6}
        }
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log(body);
            }
        })   
           
}





// Set the headers
var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
}

// Configure the request
var options = {
    url: 'http://' + hostid + '/starttrip',
    method: 'POST',
    headers: headers,
    form: {'tripname': 'Mumbai219', 'members': [501, 601, 701]}
}

// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        var tripid = body.toString();
        // var tripid = 777000; 
       httprequest1(tripid); 
       
       setTimeout(function(){
           httprequest2(tripid);
           setTimeout(function(){
               httprequest3(tripid);
           },120001);                      
       },120001);
       
       
       
    }
    })