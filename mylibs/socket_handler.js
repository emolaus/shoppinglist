var socketio = require('socket.io');
var async = require('async');

var io = null;
//var messages = [];
var sockets = [];
var dbHandler;

function init(server, _dbHandler) {
    io = socketio.listen(server);
    dbHandler = _dbHandler;
    
    io.on('connection', function (socket) {
    console.log("Connecting new socket");

    
    dbHandler.getList(function (error, list) {
        if (!error) socket.emit('updatedList', list);    
    });

    sockets.push(socket);
    console.log("Total number of sockets in cache: " + sockets.length);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
    });

    
    socket.on('addItem', function (itemName) {
        console.log("socket_handler: adding shopping item");
        dbHandler.addItem(itemName, waitForCallbackThenBroadcast);
        
    });
    
    socket.on('removeItem', function (itemName) {
        console.log("removing shopping item");
        dbHandler.removeItem(itemName, waitForCallbackThenBroadcast);
        
    });
  });
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

function waitForCallbackThenBroadcast(error) {
    if (!error) {
        dbHandler.getList(function (err, list) {
            if (!err) {
                broadcast('updatedList', list);
            }
        });        
    }
}

exports.init = init;