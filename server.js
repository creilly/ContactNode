var http = require("http");
var url = require("url");
var fs = require("fs");
var $ = require("jquery");
var querystring = require("querystring");

home = fs.readFileSync('./home.html','utf8');
arena = fs.readFileSync('./arena.html','utf8');
arenaScript = fs.readFileSync('./arenaScript.js','utf8');
userQueue = ['apple','orange','banana','strawberry'];
users = [];
newUserResponses = [];

function respond(response,text,type){
    console.log('sending: ', text.length);
    response.writeHead(200, {"Content-Type": type});
    response.write(text);
    response.end();
}

function start() {
    function onRequest(request, response) {
	var pathname = url.parse(request.url).pathname;
	var postData = "";
	console.log( "pathname = " + pathname );
	request.addListener("data", function(chunk){
	    postData += chunk;
	});
	request.addListener("end", function(){
	    password = querystring.parse(postData).pass;
	    if (pathname == "/arena"){
		if (password == "bella"){
		    respond(response,arena,'text/html');
		    newUser = userQueue.pop();
		    users.push(newUser);
		    while (newUserResponses.length){
			resp = newUserResponses.pop();
			respond(resp,newUser,'text/plain');
		    }
		}
		else {
		    respond(response,"Bad password","text/plain");
		}
	    }
	});		  
	if (pathname == '/' || pathname == '') 
	{
	    respond(response,home,'text/html');
	}
	if (pathname == '/users'){
	    respond(response,JSON.stringify(users),'application/json');
	}	
	if (pathname == '/arenascript.js'){
	    respond(response,arenaScript,'text/javascript');
	}
	if (pathname == '/newuser'){
	    newUserResponses.push(response);
	}
    }

    http.createServer(onRequest).listen(process.env.PORT || 8888);
    console.log("Server has started.");
}

exports.start = start;
