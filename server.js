var http = require("http");
var url = require("url");
var fs = require("fs");

var arena = require("./arena");
var util = require("./util");

var respond = util.respond;

home = fs.readFileSync('./home.html','utf8');
arenaScript = fs.readFileSync('./arenascript.js','utf8');

function start() {
    function onRequest(request, response) {
	var parsed = url.parse(request.url, true);
	var pathname = parsed.pathname;
	if (parsed.query.data){
	    var data = JSON.parse(parsed.query.data);
	}
	console.log('pathname: ',pathname);

	switch (pathname){

	case('/'): 
	    respond(response,home,'text/html');
	    break;
	    
	case('/arena'):
	    util.getData(request,function(data){
		arena.login(data,response);
	    });
	    break;

	case('/users'):
	    arena.users(data,response);
	    break;

	case('/arenascript.js'):
	    respond(response,arenaScript,'text/javascript');
	    break;

	case('/favicon.ico'):
	    respond(response,'eat shit','text/plain');
	    break;

	}
    }

    http.createServer(onRequest).listen(process.env.PORT || 8888);
    console.log("Server has started.");
}

exports.start = start;
