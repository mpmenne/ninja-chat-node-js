var http = require("http");

http.createServer(function(request, response) {
   response.writeHead(200, {"Content-Type":"text/plain"});
   response.write("Hello World 1");
   response.end();
}).listen(8889);
