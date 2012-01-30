var i = 0;

function newUser(){
    i += 1;
    alert( 'call #' + i.toString() );
    $.get("/newuser", function(user){
	$("<li>" + user + "</li>").appendTo("ul");
	newUser();
    });    
}

$( function() {    
    $.getJSON("/users", function(data) {
	for (var player in data){
	    $("<li>" + data[player] + "</li>").appendTo("ul");
	}
    });  
    newUser();
});
