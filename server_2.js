
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
	// we don't need to handle any HTTP requests since we are using WebSocket protocol
	console.log('server running');
	response.end();
});
server.listen(8000);

var history = [];
var clients = [];

// create the websocket server
wsServer = new WebSocketServer( {
	httpServer: server });
wsServer.on('request', function(request) {
	var connection = request.accept(null, request.origin);
	// we store the index so that we can remove that connection on 'close' event
	var index = clients.push(connection) - 1;

	connection.on('message', function(message) {
		console.log('Request received');

		// push the message onto the history stack
		var incomingMessage = message.utf8Data;
		history.push(incomingMessage);
		history.slice(-100);

		// process websocket message here
		for ( var i=0; i < clients.length; i++ ) {
			console.log(new Date().getTime() + ': broadcasting to client');
			clients[i].sendUTF(incomingMessage);
		}
	});

	connection.on('close', function(connection) {
		// close user connection
		console.log('prior to removing client');
		clients.splice(index, 1);
		console.log('after removing client');
	});
});
