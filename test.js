var jade = require('jade');
var fs = require('fs');
template = fs.readFileSync('./templates/arena.jade','utf8');
console.log(template);
console.log(jade.compile(template,{pretty: true})({name: 'sex'}));
