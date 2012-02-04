var fs = require("fs");
var url = require('url');
var jade = require("jade");

var util = require("./util");

var namePool = ['robby','levon','richard','rick','garth'];
var users = {};
var arenaHTML = jade.compile(fs.readFileSync('./templates/arena.jade', 'utf8'), {pretty: true});

function login(data,response){
    if (data.pass == 'bella'){
	name = namePool.pop();
	if (name){
	    users[name] = {};
	    util.respond(response,arenaHTML(name),'text/html');
	}
	else {
	    util.respond(response,'arena full.','text/plain');
	}
    }
    else {
	util.respond(response,'access denied.','text/plain');
    }
}

function usersquery(data,response){
    users[data.name].response = response;
    if (data.now){
	var names = [];
	for (var user in users){
	    names.push(user);
	}
	names = JSON.stringify(names);
	for (user in users){	    
	    userResponse = users[user].response;
	    if (userResponse){
		util.respond(userResponse,names,'application/json');
	    }
	}
    }
}

exports.login = login;
exports.users = usersquery;
