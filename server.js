var http=require("http");
var url = require("url");

var routing = require('./routeHandler');

http.createServer(function(request, response) {
    var url_parts = url.parse(request.url);
    console.log(url_parts);
    routing.enableRoute(url_parts,request,response);
}).listen(3000);

console.log("Server Started");