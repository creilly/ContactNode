var http = require("http");
var url = require("url");

function start() {
    function onRequest(request, response) {
	var pathname = url.parse(request.url).pathname;
	console.log("Request for " + pathname + " received.");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<p>URL requested:</p>");
	response.write("<p>" + pathname + "</p>");
	response.end();
    }

    http.createServer(onRequest).listen(process.env.PORT || 8888);
    console.log("Server has started.");
}

exports.start = start;
