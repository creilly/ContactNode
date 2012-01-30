var http = require("http");
var url = require("url");
var fs = require("fs");
var querystring = require("querystring");

home = fs.readFileSync('./home.html','utf8');
arena = fs.readFileSync('./arena.html','utf8');
arenaScript = fs.readFileSync('./arenascript.js','utf8');
userQueue = ['apple','orange','banana'];
users = [];
newUserResponses = [];

function respond(response,text,type){
    response.writeHead(200, {"Content-Type": type});
    response.write(text);
    response.end();
}

function start() {
    function onRequest(request, response) {
	var pathname = url.parse(request.url).pathname;
	var postData = "";
	request.addListener("data", function(chunk){
	    postData += chunk;
	});
	request.addListener("end", function(){
	    password = querystring.parse(postData).pass;
	    if (pathname == "/arena"){
		if (password == "bella"){
		    newUser = userQueue.pop();
		    if (newUser){
			users.push(newUser);
			console.log("purging new user requests...");
			var i = 0;
			while (newUserResponses.length){
			    i += 1;
			    console.log(i);
			    resp = newUserResponses.pop();
			    respond(resp,newUser,'text/plain');
			}
			respond(response,arena,'text/html');
		    }
		    else {
			respond(response,"Arena full",'text/html');
		    }
		}
		else {
		    respond(response,"Bad password","text/plain");
		}
	    }
	});		  
	switch (pathname){
	    case('/favicon.ico'):
	    respond(response,'eat shit','text/plain');
	    break;

	    case('/'): 
	    respond(response,home,'text/html');
	    break;
	    
	    case('/users'):
	    respond(response,JSON.stringify(users),'application/json');
	    break;

	    case('/arenascript.js'):
	    respond(response,arenaScript,'text/javascript');
	    break;

	    case('/newuser'):
	    newUserResponses.push(response);
	    console.log('new user request');
	    break;	    
	}
    }

    http.createServer(onRequest).listen(process.env.PORT || 8888);
    console.log("Server has started.");
}

exports.start = start;
