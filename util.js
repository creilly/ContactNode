var querystring = require("querystring");

function respond(response,text,type){
    response.writeHead(200, {"Content-Type": type});
    response.write(text);
    response.end();
}

function getData(request,callback){
    var data = "";
    request.addListener("data", function(chunk){
	data += chunk;
    });
    request.addListener("end", function(){
	data = querystring.parse(data);
	for (var key in data){
	    console.log(key);
	    console.log(data[key]);
	}
	callback(data);
    });
}

exports.respond = respond;
exports.getData = getData;
