
// A shopping list server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

// routing
var express = require('express');
var app = express();
var server = http.createServer(app);

/*
app.get('/', function (req,response){
    console.log("Request received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();    
});
app.get('/index.html', function (req, response){
    console.log("Request received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("index");
    response.end();      
});
*/

app.use(express.static(path.resolve(__dirname, 'client')));



// real-time io and db handler
var socket_handler = require('./mylibs/socket_handler.js');
var db_handler = require('./mylibs/db_handler.js');
socket_handler.init(server, db_handler);



server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
